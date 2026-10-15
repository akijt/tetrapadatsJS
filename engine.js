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
    focusHandler(e, current_time) {}
    blurHandler(e, current_time) {}
    resizeHandler(e, current_time) {}
    keyDownHandler(e, current_time) {}
    keyUpHandler(e, current_time) {}
    mouseDownHandler(e, current_time) {}
    mouseUpHandler(e, current_time) {}
    moveHandler(e, current_time) {}
    wheelHandler(e, current_time) {}
}

class Engine {
    constructor(aspect_w = 4, aspect_h = 3, grid_scale = 10) {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.tabIndex = -1;
        this.canvas.style.outline = 'none';

        this.aspect_w = aspect_w;
        this.aspect_h = aspect_h;
        this.grid_scale = grid_scale;
        this.grid_w = this.aspect_w * this.grid_scale;
        this.grid_h = this.aspect_h * this.grid_scale;

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

    run(screen) {
        const current_time = Math.floor(performance.now());

        window.addEventListener('focus', this.focusHandler.bind(this));
        window.addEventListener('blur', this.blurHandler.bind(this));
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.canvas.addEventListener('keydown', this.keyDownHandler.bind(this));
        this.canvas.addEventListener('keyup', this.keyUpHandler.bind(this));
        this.canvas.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
        this.canvas.addEventListener('click', this.clickHandler.bind(this));
        this.canvas.addEventListener('auxclick', this.auxClickHandler.bind(this));
        this.canvas.addEventListener('contextmenu', this.contextMenuHandler.bind(this));
        this.canvas.addEventListener('mousemove', this.moveHandler.bind(this));
        this.canvas.addEventListener('wheel', this.wheelHandler.bind(this), { passive: false });
        this.canvas.focus();

        this.resizeHandler();
        screen.push_state(current_time);
        requestAnimationFrame(this.game_loop.bind(this));
    }

    game_loop() {
        requestAnimationFrame(this.game_loop.bind(this));
        const current_time = Math.floor(performance.now());
        this.active_screen?.update(current_time);
        this.active_screen?.render(current_time);
    }

    start_text_input(initial_text = '', max_length = 16) {
        this.text_input_active = true;
        this.text_buffer = initial_text;
        this.text_max_length = max_length;
    }

    stop_text_input() {
        this.text_input_active = false;
        const text = this.text_buffer;
        this.text_buffer = '';
        return text;
    }

    focusHandler(e) {
        const current_time = Math.floor(performance.now());
        this.canvas.focus();
        this.active_screen?.focusHandler?.(e, current_time);
    }

    blurHandler(e) {
        const current_time = Math.floor(performance.now());
        Object.keys(this.input_state).forEach(code => {
            if (this.input_state[code] > 0) {
                this.input_state[code] = 0;
                if (code.startsWith('Mouse')) {
                    const button = parseInt(code.replace('Mouse', ''), 10);
                    this.active_screen?.mouseUpHandler({ button: button, clientX: -1, clientY: -1 }, current_time);
                } else {
                    this.active_screen?.keyUpHandler({ code: code }, current_time);
                }
            }
        });
        this.active_screen?.blurHandler(e, current_time);
    }

    resizeHandler(e) {
        // CSS Pixels: set CSS area to the container provided
        const parent = this.canvas.parentElement;
        const css_w = (parent && parent.clientWidth) ? parent.clientWidth : window.innerWidth;
        const css_h = (parent && parent.clientHeight) ? parent.clientHeight : window.innerHeight;

        this.canvas.style.width = `${css_w}px`;
        this.canvas.style.height = `${css_h}px`;

        // Canvas Pixels: set canvas to the same size as the CSS area
        this.w = css_w;
        this.h = css_h;
        this.mid_x = Math.floor(this.w / 2);
        this.mid_y = Math.floor(this.h / 2);
        this.tile_size = Math.floor(Math.min(this.w / this.grid_w, this.h / this.grid_h));

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        // // Physical Pixels: set canvas to align with display pixles
        // const dpr = window.devicePixelRatio || 1;
        // this.canvas.width = Math.floor(this.w * dpr);
        // this.canvas.height = Math.floor(this.h * dpr);
        // this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        // this.ctx.scale(dpr, dpr);

        const current_time = Math.floor(performance.now());
        this.active_screen?.resizeHandler?.(e, current_time);
    }

    keyDownHandler(e) {
        if (e.code.startsWith('F')) {
            return;
        } else if (this.text_input_active) {
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
            e.preventDefault();
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

    get_canvas_coords(e) {
        const rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        if (rect.width !== 0 && rect.height !== 0) {
            x *= this.canvas.width / rect.width;
            y *= this.canvas.height / rect.height;
        }
        return { x: Math.floor(x), y: Math.floor(y) };
    }

    mouseDownHandler(e) {
        this.canvas.focus();
        const code = 'Mouse' + e.button;
        if (this.input_state[code] === 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = current_time;
            const { x, y } = this.get_canvas_coords(e);
            this.active_screen?.mouseDownHandler({ ...e, button: e.button, clientX: x, clientY: y }, current_time);
        }
    }

    mouseUpHandler(e) {
        const code = 'Mouse' + e.button;
        if (this.input_state[code] > 0) {
            const current_time = Math.floor(performance.now());
            this.input_state[code] = 0;
            const { x, y } = this.get_canvas_coords(e);
            this.active_screen?.mouseUpHandler({ ...e, button: e.button, clientX: x, clientY: y }, current_time);
        }
    }

    clickHandler(e) {
        e.preventDefault();
    }

    auxClickHandler(e) {
        e.preventDefault();
    }

    contextMenuHandler(e) {
        e.preventDefault();
    }

    moveHandler(e) {
        const current_time = Math.floor(performance.now());
        const { x, y } = this.get_canvas_coords(e);
        this.active_screen?.moveHandler({ ...e, clientX: x, clientY: y, movementX: e.movementX, movementY: e.movementY }, current_time);
    }

    wheelHandler(e) {
        e.preventDefault();
        const current_time = Math.floor(performance.now());
        this.active_screen?.wheelHandler?.(e, current_time);
    }
}