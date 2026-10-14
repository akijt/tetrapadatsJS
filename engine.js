class Screen {
    constructor(prev = null, engine) {
        this.prev = prev;
        this.engine = engine;
        this.layers = [];
        this.push_time = undefined;
        this.enter_time = undefined;
    }

    push_state(current_time) {
        this.push_time = current_time;
        this.engine.active_screen = this;
        this.enter_state(current_time);
        return this;
    }

    pop_state(current_time, count = 1) {
        let current = this;
        while (count > 0 && current.prev) {
            current = current.prev;
            count--;
        }
        this.engine.active_screen = current;
        current.enter_state(current_time);
        return current;
    }

    enter_state(current_time) {
        this.enter_time = current_time;
        this.resizeHandler(null, current_time);
    }

    add_layer(name) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const layer = { name, canvas, ctx };
        this.layers.push(layer);
        return layer;
    }

    get_layer(name) {
        return this.layers.find(layer => layer.name === name) || null;
    }

    update(current_time) {
        console.error('update not implemented');
    }

    render(current_time) {
        console.error('render not implemented');
    }

    textInputHandler(e, current_time) {}
    resizeHandler(e, current_time) {}
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
    constructor(aspect_w = 4, aspect_h = 3, grid_scale = 10) {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.aspect_w = aspect_w;
        this.aspect_h = aspect_h;
        this.grid_scale = grid_scale;
        this.grid_w = this.aspect_w * this.grid_scale;
        this.grid_h = this.aspect_h * this.grid_scale;

        this.dpr = 1;
        this.w = 0;
        this.h = 0;
        this.mid_x = 0;
        this.mid_y = 0;
        this.tile_size = 0;

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

        this.active_screen = null;
    }

    run(screen) { // TODO: possibly change document to this.canvas for different mouse location data
        const current_time = Math.floor(performance.now());
        screen.push_state(current_time);

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
        this.active_screen?.update(current_time);
        this.active_screen?.render(current_time);
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
        this.dpr = window.devicePixelRatio || 1;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.mid_x = Math.floor(this.w / 2);
        this.mid_y = Math.floor(this.h / 2);
        this.tile_size = Math.floor(Math.min(this.w / this.grid_w, this.h / this.grid_h));

        // Logical screen pixels
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;

        // Physical screen pixels
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // this.canvas.width = Math.floor(window.innerWidth * this.dpr);
        // this.canvas.height = Math.floor(window.innerHeight * this.dpr);

        // this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        // this.ctx.scale(this.dpr, this.dpr);

        const current_time = Math.floor(performance.now());
        this.active_screen?.resizeHandler?.(e, current_time);
    }

    keyDownHandler(e) {
        if (this.text_input_active) {
            const key = e.key;
            if (key === 'Enter' || key === 'Escape' || key === 'Tab') {
                const current_time = Math.floor(performance.now());
                const text = this.stop_text_input();
                this.active_screen?.textInputHandler(e, current_time, {text: text, key: key});
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
                this.active_screen?.keyDownHandler(e, current_time);
            }
        }
    }

    keyUpHandler(e) {
        const code = e.code;
        if (this.input_state[code] > 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = 0;
            this.active_screen?.keyUpHandler(e, current_time);
        }
    }

    mouseDownHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] === 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = current_time;
            this.active_screen?.mouseDownHandler(e, current_time);
        }
    }

    mouseUpHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] > 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = 0;
            this.active_screen?.mouseUpHandler(e, current_time);
        }
    }

    clickHandler(e) {
        const current_time = Math.floor(performance.now());
        this.active_screen?.clickHandler(e, current_time);
    }

    auxClickHandler(e) {
        e.preventDefault();
        const current_time = Math.floor(performance.now());
        this.active_screen?.auxClickHandler(e, current_time);
    }

    contextMenuHandler(e) {
        e.preventDefault();
        const current_time = Math.floor(performance.now());
        this.active_screen?.contextMenuHandler(e, current_time);
    }

    moveHandler(e) {
        const current_time = Math.floor(performance.now());
        this.active_screen?.moveHandler(e, current_time);
    }
}