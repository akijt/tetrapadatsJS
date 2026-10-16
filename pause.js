class Pause extends Screen {
    constructor(prev = null, engine, game) {
        super(prev, engine);
        this.game = game;
    }

    update(current_time) {
    }

    render(current_time) {
        const {w, h, mid_x, mid_y, tile_size} = this.engine;

        // CLEAR SCREEN
        this.engine.ctx.clearRect(0, 0, w, h);
        
        // PRINT BACKGROUND
        const bg_canvas = this.prev.get_layer('background').canvas;
        this.engine.ctx.drawImage(bg_canvas, 0, 0);

        // PRINT STAT TEXT
        this.engine.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.engine.ctx.textBaseline = 'bottom';
        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.fillText(this.game.stats.mode, mid_x + (0) * tile_size, mid_y + (12) * tile_size);

        this.engine.ctx.textAlign = 'left';
        this.engine.ctx.fillText(this.game.stats.score, mid_x + (6) * tile_size, mid_y + (6) * tile_size);
        const t = this.game.stats.time;
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

        // PRINT PAUSE LABEL
        this.engine.ctx.fillRect(mid_x + (-4) * tile_size, mid_y + (-1) * tile_size, 8 * tile_size, 2 * tile_size);

        this.engine.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.engine.ctx.textAlign = 'center';
        this.engine.ctx.font = `${tile_size * 2}px Arial`;
        this.engine.ctx.fillText('paused', mid_x + (0) * tile_size, mid_y + (1) * tile_size);
    }

    keyDownHandler(e, current_time) {
        switch (e.code) {
            case this.game.bindings['quit']:
                this.game.action_handler('quit_press', current_time);
                this.pop_state(current_time);
                break;
            case this.game.bindings['reset']:
                this.game.action_handler('reset_press', current_time);
                this.pop_state(current_time);
                new Ready(this.prev, this.engine, this.game).push_state(current_time);
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