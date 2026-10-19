class Ready extends Screen {
    constructor(prev = null, engine, game) {
        super(prev, engine);
        this.game = game;
        this.countdown_duration = 3000;
    }

    update(current_time) {
        if (current_time - this.enter_time > this.countdown_duration) {
            this.game.action_handler('start', current_time);
            socket.emit('action', { type: 'start', time: current_time });
            this.pop_state(current_time);
        }
    }

    render(current_time) {
        const {w, h, mid_x, mid_y, tile_size} = this.engine;

        // CLEAR SCREEN
        this.engine.ctx.clearRect(0, 0, w, h);

        // PRINT BACKGROUND
        const bg_canvas = this.prev.get_layer('background').canvas;
        this.engine.ctx.drawImage(bg_canvas, 0, 0);

        // PRINT BOARD
        for (let r = 0; r < 25; r++) {
            let top = mid_y + (9 - r) * tile_size;
            for (let c = 0; c < 10; c++) {
                const cell = this.game.board[r][c];
                if (cell !== null && (cell !== 'x' || r < 20)) {
                    this.engine.ctx.fillStyle = this.game.colors[cell];
                    let left = mid_x + (-5 + c) * tile_size;
                    this.engine.ctx.fillRect(left, top, tile_size, tile_size);
                }
            }
        }

        // PRINT NEXT PIECES
        for (let j = 0; j < this.game.customizations.next; j++) {
            this.engine.ctx.fillStyle = this.game.colors[this.game.queue[j]];
            const minos_piece_rotation = Tetra.MINOS[this.game.queue[j]][0];
            for (let i = 0; i < 4; i++) {
                const delta = minos_piece_rotation[i];
                let left = mid_x + (6 + delta[0]) * tile_size;
                let top = mid_y + (-9 - delta[1] + 3 * j) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
        }

        // PRINT HELD PIECE
        if (this.game.held !== null) {
            if (this.game.hold_used) {
                this.engine.ctx.fillStyle = this.game.colors['x'];
            } else {
                this.engine.ctx.fillStyle = this.game.colors[this.game.held];
            }
            const minos_piece_rotation = Tetra.MINOS[this.game.held][0];
            for (let i = 0; i < 4; i++) {
                const delta = minos_piece_rotation[i];
                let left = mid_x + (-10 + delta[0]) * tile_size;
                let top = mid_y + (-9 - delta[1]) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
        }

        // PRINT STAT TEXT
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.textBaseline = 'bottom';
        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.fillText(this.game.stats.mode, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        this.engine.ctx.textAlign = 'left';
        this.engine.ctx.fillText(0, mid_x + (6) * tile_size, mid_y + (6) * tile_size);
        this.engine.ctx.fillText('0:00.000', mid_x + (6) * tile_size, mid_y + (9) * tile_size);

        this.engine.ctx.textAlign = 'right';
        this.engine.ctx.fillText(0, mid_x + (-6) * tile_size, mid_y + (3) * tile_size);
        this.engine.ctx.fillText(0, mid_x + (-6) * tile_size, mid_y + (6) * tile_size);
        this.engine.ctx.fillText(this.game.stats.level, mid_x + (-6) * tile_size, mid_y + (9) * tile_size);

        // PRINT COUNTDOWN
        this.engine.ctx.fillRect(mid_x + (-4) * tile_size, mid_y + (-1) * tile_size, 8 * tile_size, 2 * tile_size);

        this.engine.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.fillText(Math.ceil((this.countdown_duration - current_time + this.enter_time) / 1000), mid_x + (0) * tile_size, mid_y + (1) * tile_size);
    }

    keyDownHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['quit']:
                this.pop_state(current_time, 2);
                socket.emit('room', { type: 'leave' });
                break;
            case this.game.bindings['reset']:
                if (typeof io !== 'undefined' && socket.connected) {
                    socket.emit('action', { type: 'reset_press', time: current_time }, (response) => {
                        this.game.action_handler('reset_press', response.time, { seed: response.seed });
                        this.enter_time = response.time;
                    });
                } else {
                    this.game.action_handler('reset_press', current_time);
                    this.enter_time = current_time; 
                }
                break;
            case this.game.bindings['move_left']:
                this.game.action_handler('move_left_press', current_time);
                socket.emit('action', { type: 'move_left_press', time: current_time });
                break;
            case this.game.bindings['move_right']:
                this.game.action_handler('move_right_press', current_time);
                socket.emit('action', { type: 'move_right_press', time: current_time });
                break;
            case this.game.bindings['soft_drop']:
                this.game.action_handler('soft_drop_press', current_time);
                socket.emit('action', { type: 'soft_drop_press', time: current_time });
                break;
        }
    }

    keyUpHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['move_left']:
                this.game.action_handler('move_left_release', current_time);
                socket.emit('action', { type: 'move_left_release', time: current_time });
                break;
            case this.game.bindings['move_right']:
                this.game.action_handler('move_right_release', current_time);
                socket.emit('action', { type: 'move_right_release', time: current_time });
                break;
            case this.game.bindings['soft_drop']:
                this.game.action_handler('soft_drop_release', current_time);
                socket.emit('action', { type: 'soft_drop_release', time: current_time });
                break;
        }
    }
}