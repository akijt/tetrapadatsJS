class Play extends Screen {
    constructor(prev = null, engine, game) {
        super(prev, engine);
        this.game = game;

        this.add_layer('background');
    }

    update(current_time) {
        if (this.game.frame_update(current_time)) {
            this.game.action_handler('pause', current_time);
            new Finish(this, this.engine, this.game).push_state(current_time);
        }
    }

    render(current_time) {
        const {w, h, mid_x, mid_y, tile_size} = this.engine;

        // CLEAR SCREEN
        this.engine.ctx.clearRect(0, 0, w, h);

        // PRINT BACKGROUND
        const bg_canvas = this.get_layer('background').canvas;
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

        // PRINT TARGET PIECE
        if (this.game.customizations.target) {
            const minos_piece_rotation = Tetra.MINOS[this.game.piece][this.game.target.rotation];
            this.engine.ctx.fillStyle = this.game.colors['x'];
            for (let i = 0; i < 4; i++) {
                const delta = minos_piece_rotation[i];
                let left = mid_x + (-5 + this.game.target.position[0] + delta[0]) * tile_size;
                let top = mid_y + (9 - this.game.target.position[1] - delta[1]) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
        }

        // PRINT GHOST PIECE
        const minos_piece_rotation = Tetra.MINOS[this.game.piece][this.game.rotation];
        this.engine.ctx.fillStyle = this.game.colors[this.game.piece];
        if (this.game.customizations.ghost && this.game.height !== 0) {
            this.engine.ctx.save();
            this.engine.ctx.globalAlpha = 0.5;
            for (let i = 0; i < 4; i++) {
                const delta = minos_piece_rotation[i];
                let left = mid_x + (-5 + this.game.position[0] + delta[0]) * tile_size;
                let top = mid_y + (9 - this.game.position[1] - delta[1] + this.game.height) * tile_size;
                this.engine.ctx.fillRect(left, top, tile_size, tile_size);
            }
            this.engine.ctx.restore();
        }

        // PRINT CURRENT PIECE
        for (let i = 0; i < 4; i++) {
            const delta = minos_piece_rotation[i];
            let left = mid_x + (-5 + this.game.position[0] + delta[0]) * tile_size;
            let top = mid_y + (9 - this.game.position[1] - delta[1]) * tile_size;
            this.engine.ctx.fillRect(left, top, tile_size, tile_size);
        }

        // PRINT STAT TEXT
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.textBaseline = 'bottom';
        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.fillText(this.game.stats.mode, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        this.engine.ctx.textAlign = 'left';
        this.engine.ctx.fillText(this.game.stats.score, mid_x + (6) * tile_size, mid_y + (6) * tile_size);
        const t = current_time - this.game.stats.time;
        const m = Math.floor(t / 60000);
        const s = Math.floor(t / 1000) % 60;
        const ms = t % 1000;
        this.engine.ctx.fillText(`${m}:${s < 10 ? '0' : ''}${s}.${ms < 100 ? (ms < 10 ? '00' : '0') : ''}${ms}`, mid_x + 6 * tile_size, mid_y + 9 * tile_size);

        this.engine.ctx.textAlign = 'right';
        this.engine.ctx.fillText(this.game.stats.pieces, mid_x + (-6) * tile_size, mid_y + (3) * tile_size);
        this.engine.ctx.fillText(this.game.stats.lines, mid_x + (-6) * tile_size, mid_y + (6) * tile_size);
        this.engine.ctx.fillText(this.game.stats.level, mid_x + (-6) * tile_size, mid_y + (9) * tile_size);

        this.engine.ctx.font = `${tile_size}px Arial`;
        this.engine.ctx.fillText((this.game.b2b > 0) ? `${this.game.b2b} B2B` : '', mid_x + (-6) * tile_size, mid_y + (-5) * tile_size);
        this.engine.ctx.fillText(this.game.last_clear, mid_x + (-6) * tile_size, mid_y + (-4) * tile_size);
        this.engine.ctx.fillText((this.game.combo > 0) ? `${this.game.combo} combo` : '', mid_x + (-6) * tile_size, mid_y + (-3) * tile_size);
    }

    resizeHandler(e, current_time) {
        const {w, h, mid_x, mid_y, tile_size} = this.engine;

        // ADJUST BACKGROUND CANVAS
        const layer = this.get_layer('background');
        const bg_canvas = layer.canvas;
        const bg_ctx = layer.ctx;
        bg_canvas.width = w;
        bg_canvas.height = h;
        bg_ctx.clearRect(0, 0, w, h);

        // PRINT GRID
        bg_ctx.beginPath();
        bg_ctx.strokeStyle = 'rgb(255, 255, 255)';
        bg_ctx.lineWidth = Math.ceil(tile_size / 32) * 2;
        const board_x = mid_x - 5 * tile_size;
        const board_y = mid_y - 10 * tile_size;
        const board_w = 10 * tile_size;
        const board_h = 20 * tile_size;
        bg_ctx.rect(board_x, board_y, board_w, board_h);
        for (let c = 1; c < 10; c++) {
            const x = board_x + c * tile_size;
            bg_ctx.moveTo(x, board_y);
            bg_ctx.lineTo(x, board_y + board_h);
        }
        for (let r = 1; r < 20; r++) {
            const y = board_y + r * tile_size;
            bg_ctx.moveTo(board_x, y);
            bg_ctx.lineTo(board_x + board_w, y);
        }
        bg_ctx.stroke();

        // PRINT LABEL TEXT
        bg_ctx.fillStyle = 'rgb(255, 255, 255)';
        bg_ctx.textBaseline = 'bottom';
        bg_ctx.font = `${tile_size}px Arial`;
        bg_ctx.textAlign = 'left';
        bg_ctx.fillText('score:', mid_x + (6) * tile_size, mid_y + (4) * tile_size);
        bg_ctx.fillText('time:', mid_x + (6) * tile_size, mid_y + (7) * tile_size);

        bg_ctx.textAlign = 'right';
        bg_ctx.fillText('pieces:', mid_x + (-6) * tile_size, mid_y + (1) * tile_size);
        bg_ctx.fillText('lines:', mid_x + (-6) * tile_size, mid_y + (4) * tile_size);
        bg_ctx.fillText('level:', mid_x + (-6) * tile_size, mid_y + (7) * tile_size);
    }


    keyDownHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['quit']:
                this.game.action_handler('pause', current_time);
                new Pause(this, this.engine, this.game).push_state(current_time);
                break;
            case this.game.bindings['reset']:
                this.game.action_handler('reset', current_time);
                new Ready(this, this.engine, this.game).push_state(current_time);
                break;
            case this.game.bindings['hold']:
                this.game.action_handler('hold', current_time);
                break;
            case this.game.bindings['rotate_cw']:
                this.game.action_handler('rotate_cw', current_time);
                break;
            case this.game.bindings['rotate_180']:
                this.game.action_handler('rotate_180', current_time);
                break;
            case this.game.bindings['rotate_ccw']:
                this.game.action_handler('rotate_ccw', current_time);
                break;
            case this.game.bindings['move_left']:
                this.game.action_handler('move_left_press', current_time);
                break;
            case this.game.bindings['move_right']:
                this.game.action_handler('move_right_press', current_time);
                break;
            case this.game.bindings['soft_drop']:
                this.game.action_handler('soft_drop_press', current_time);
                break;
            case this.game.bindings['hard_drop']:
                this.game.action_handler('hard_drop', current_time);
                break;
        }
    }

    keyUpHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['move_left']:
                this.game.action_handler('move_left_release', current_time);
                break;
            case this.game.bindings['move_right']:
                this.game.action_handler('move_right_release', current_time);
                break;
            case this.game.bindings['soft_drop']:
                this.game.action_handler('soft_drop_release', current_time);
                break;
        }
    }
}