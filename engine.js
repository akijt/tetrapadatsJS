class Screen {
    constructor(engine) {
        this.engine = engine;
        this.enter_time = 0;
    }

    enter_state(current_time) {
        this.engine.state_stack.push(this);
        this.enter_time = current_time;
    }

    exit_state(count = 1) {
        while (count > 0 && this.engine.state_stack.length > 0) {
            this.engine.state_stack.pop();
            count--;
        }
    }

    update(current_time) {
        console.error('update not implemented')
    }

    render(current_time) {
        console.error('render not implemented')
    }

    textInputHandler(e, current_time) {}
    keyDownHandler(e, current_time) {}
    keyUpHandler(e, current_time) {}
    mouseDownHandler(e, current_time) {}
    mouseUpHandler(e, current_time) {}
    clickHandler(e, current_time) {}
    auxClickHandler(e, current_time) {}
    contextMenuHandler(e, current_time) {}
    moveHandler(e, current_time) {}
}

class Engine {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.w = 0;
        this.h = 0;
        this.tile_size = 0;
        this.mid_x = 0;
        this.mid_y = 0;

        const input_codes = [
            // Mouse
            'Mouse0', 'Mouse1', 'Mouse2',
            // Digits
            'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
            // Letters
            'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
            'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
            'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM',
            // Symbols
            'Backquote', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 'Backslash',
            'Semicolon', 'Quote', 'Comma', 'Period', 'Slash', 'Space',
            // Other
            'Backspace', 'Tab', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight',
            'AltLeft', 'AltRight', 'CapsLock', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
            'Delete', 'Insert'
        ];
        this.input_state = {};
        input_codes.forEach(code => {this.input_state[code] = 0;});

        this.text_input_active = false;
        this.text_buffer = '';
        this.text_max_length = 16;

        this.state_stack = [];
        // this.debug = '';
    }

    run(screen) { // TODO: possibly change document to this.canvas for different mouse location data
        const current_time = Math.floor(performance.now());
        screen.enter_state(current_time);
        window.addEventListener('resize', this.resizeHandler.bind(this));
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
        document.addEventListener('keyup', this.keyUpHandler.bind(this));
        document.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
        document.addEventListener('auxclick', this.auxClickHandler.bind(this));
        document.addEventListener('contextmenu', this.contextMenuHandler.bind(this));
        document.addEventListener('mousemove', this.moveHandler.bind(this));

        this.resizeHandler();
        requestAnimationFrame(this.game_loop.bind(this));
    }

    game_loop() {
        requestAnimationFrame(this.game_loop.bind(this));
        const current_time = Math.floor(performance.now());
        this.state_stack[this.state_stack.length - 1]?.update(current_time);
        this.state_stack[this.state_stack.length - 1]?.render(current_time);
    }

    start_text_input(intial_text = '', max_length = 16) {
        this.text_input_active = true;
        this.text_buffer = intial_text;
        this.text_max_length = max_length;
    }

    stop_text_input() {
        this.text_input_active = false;
        const text = this.text_buffer;
        this.text_buffer = '';
        return text;
    }

    resizeHandler(e) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.tile_size = Math.floor(Math.min(this.w / 40, this.h / 30));
        this.mid_x = Math.floor(this.w / 2);
        this.mid_y = Math.floor(this.h / 2);
    }

    keyDownHandler(e) {
        if (this.text_input_active) {
            const key = e.key;
            if (key === 'Enter' || key === 'Escape' || key === 'Tab') {
                const current_time = Math.floor(performance.now());
                const text = this.stop_text_input();
                this.state_stack[this.state_stack.length - 1]?.textInputHandler(e, current_time, {text: text, key: key});
            } else if (key === 'Backspace') {
                this.text_buffer = this.text_buffer.slice(0, -1);
            } else if (e.key.length === 1 && this.text_buffer.length < this.text_max_length) {
                this.text_buffer += e.key;
            }
        } else if (!e.repeat) {
            const code = e.code;
            if (this.input_state[code] === 0) {
                const current_time = Math.floor(performance.now());
                this.input_state[code] = current_time;
                this.state_stack[this.state_stack.length - 1]?.keyDownHandler(e, current_time);
            }
        }
    }

    keyUpHandler(e) {
        const code = e.code;
        if (this.input_state[code] > 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = 0;
            this.state_stack[this.state_stack.length - 1]?.keyUpHandler(e, current_time);
        }
    }

    mouseDownHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] === 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = current_time;
            this.state_stack[this.state_stack.length - 1]?.mouseDownHandler(e, current_time);
        }
    }

    mouseUpHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] > 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = 0;
            this.state_stack[this.state_stack.length - 1]?.mouseUpHandler(e, current_time);
        }
    }

    clickHandler(e) {
        const current_time = Math.floor(performance.now());
        this.state_stack[this.state_stack.length - 1]?.clickHandler(e, current_time);
    }

    auxClickHandler(e) {
        e.preventDefault();
        const current_time = Math.floor(performance.now());
        this.state_stack[this.state_stack.length - 1]?.auxClickHandler(e, current_time);
    }

    contextMenuHandler(e) {
        e.preventDefault();
        const current_time = Math.floor(performance.now());
        this.state_stack[this.state_stack.length - 1]?.contextMenuHandler(e, current_time);
    }

    moveHandler(e) {
        const current_time = Math.floor(performance.now());
        this.state_stack[this.state_stack.length - 1]?.moveHandler(e, current_time);
    }
}