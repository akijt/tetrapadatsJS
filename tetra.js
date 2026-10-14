class Tetra { // TODO: review 180 kicks
    static MINOS = {'i': [[[0, 2], [1, 2], [2, 2], [3, 2]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 0], [1, 1], [1, 2], [1, 3]]],
                    'j': [[[0, 2], [1, 2], [2, 2], [0, 3]], [[1, 1], [1, 2], [1, 3], [2, 3]], [[0, 2], [1, 2], [2, 2], [2, 1]], [[1, 1], [1, 2], [1, 3], [0, 1]]],
                    'l': [[[0, 2], [1, 2], [2, 2], [2, 3]], [[1, 1], [1, 2], [1, 3], [2, 1]], [[0, 2], [1, 2], [2, 2], [0, 1]], [[1, 1], [1, 2], [1, 3], [0, 3]]],
                    'o': [[[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]], [[1, 2], [1, 3], [2, 2], [2, 3]]],
                    's': [[[1, 2], [1, 3], [0, 2], [2, 3]], [[1, 2], [2, 2], [1, 3], [2, 1]], [[1, 2], [1, 1], [2, 2], [0, 1]], [[1, 2], [0, 2], [1, 1], [0, 3]]],
                    't': [[[1, 2], [0, 2], [1, 3], [2, 2]], [[1, 2], [1, 3], [2, 2], [1, 1]], [[1, 2], [2, 2], [1, 1], [0, 2]], [[1, 2], [1, 1], [0, 2], [1, 3]]],
                    'z': [[[1, 2], [1, 3], [2, 2], [0, 3]], [[1, 2], [2, 2], [1, 1], [2, 3]], [[1, 2], [1, 1], [0, 2], [2, 1]], [[1, 2], [0, 2], [1, 3], [0, 1]]]};
    static DEFAULT_KICKS = {'t': [[[[ 0, 0]],
                                   [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
                                   [[ 0, 0], [ 0, 1]],
                                   [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]]],
                                  [[[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
                                   [[ 0, 0], [ 1, 0]]],
                                  [[[ 0, 0], [ 0,-1]],
                                   [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]]],
                                  [[[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
                                   [[ 0, 0], [-1, 0]],
                                   [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
                                   [[ 0, 0]]]],
                            'i': [[[[ 0, 0]],
                                   [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
                                   [[ 0, 0], [ 0, 1]],
                                   [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]]],
                                  [[[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [-1, 0], [ 2, 0], [-1, 2], [ 2,-1]],
                                   [[ 0, 0], [ 1, 0]]],
                                  [[[ 0, 0], [ 0,-1]],
                                   [[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
                                   [[ 0, 0]],
                                   [[ 0, 0], [ 2, 0], [-1, 0], [ 2, 1], [-1,-2]]],
                                  [[[ 0, 0], [ 1, 0], [-2, 0], [ 1,-2], [-2, 1]],
                                   [[ 0, 0], [-1, 0]],
                                   [[ 0, 0], [-2, 0], [ 1, 0], [-2,-1], [ 1, 2]],
                                   [[ 0, 0]]]]};
    static FINESSE = {'o': [[1, 2, 2, 1, 0, 1, 2, 2, 1],
                            [1, 2, 2, 1, 0, 1, 2, 2, 1],
                            [1, 2, 2, 1, 0, 1, 2, 2, 1],
                            [1, 2, 2, 1, 0, 1, 2, 2, 1]],
                      'i': [[1, 2, 1, 0, 1, 2, 1],
                            [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
                            [1, 2, 1, 0, 1, 2, 1],
                            [2, 2, 2, 2, 1, 1, 2, 2, 2, 2]],
                      's': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2],
                            [1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2]],
                      'z': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2],
                            [1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 2, 1, 1, 2, 3, 2, 2]],
                      't': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 3, 2, 1, 2, 3, 3, 2],
                            [3, 4, 3, 2, 3, 4, 4, 3],
                            [2, 3, 2, 1, 2, 3, 3, 2, 2]],
                      'j': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 3, 2, 1, 2, 3, 3, 2],
                            [3, 4, 3, 2, 3, 4, 4, 3],
                            [2, 3, 2, 1, 2, 3, 3, 2, 2]],
                      'l': [[1, 2, 1, 0, 1, 2, 2, 1],
                            [2, 2, 3, 2, 1, 2, 3, 3, 2],
                            [3, 4, 3, 2, 3, 4, 4, 3],
                            [2, 3, 2, 1, 2, 3, 3, 2, 2]]};
    static ORIENTATIONS = {'o': 1, 'i': 2, 's': 2, 'z': 2, 'j': 4, 'l': 4, 't': 4};
    static STAT_NAMES = ['mode', 'seed', 'DAS', 'ARR', 'SDF', 'time', 'score',
                         'pieces', 'lines', 'level', 'keys', 'holds', 'finesse',
                         'single', 'double', 'triple', 'quad',
                         'mini t-spin null', 'mini t-spin single', 'mini t-spin double',
                         't-spin null', 't-spin single', 't-spin double', 't-spin triple',
                         'perfect clear single', 'perfect clear double', 'perfect clear triple',
                         'perfect clear quad', 'max b2b', 'max combo'];
    static CUSTOMIZATIONS = {
        // Queue Types (this.customization.queue_type):
        // 0: 7-Bag (Shuffled bag)
        // 1: Random (Completely random)
        // 2: 1-Memory 1-Reroll (If consecutive pieces, it is rerolled once)
        // Lock Delay Types (this.customizations.lock_type):
        // 0: Classic Lock (Strict timer)
        // 1: Extended Lock (Timer resets on action with action cap)
        // 2: Infinite Lock (Timer resets on action with no action cap)
        'default': {
            kick: true,
            r180: true,
            queue_type: 0,
            allow_hold: true,
            allow_hd: true,
            lock_type: 1,
            ghost: true,
            next: 3,
            target: false,
            cheese: 0,
            four_wide: false
        },
        'classic': {
            kick: false,
            r180: false,
            queue_type: 2,
            allow_hold: false,
            allow_hd: false,
            lock_type: 0,
            ghost: false,
            next: 1
        },
        'finesse': {
            allow_hold: false,
            next: 0,
            target: true
        },
        'cheese': {
            cheese: 5
        },
        '4-wide': {
            four_wide: true
        }
    }
    static CLEAR_STRINGS     = {0: 'null', 1: 'single', 2: 'double', 3: 'triple', 4: 'quad'};
    static PC_SCORES         = {1: 800, 2: 1200, 3: 1800, 4: 2000};
    static TSPIN_SCORES      = {0: 400, 1: 800,  2: 1200, 3: 1600};
    static MINI_TSPIN_SCORES = {0: 100, 1: 200,  2: 400};
    static LINE_SCORES       = {1: 100, 2: 300,  3: 500,  4: 800};

    constructor() {
        this.colors = {'z': 'rgb(255,   0,   0)',
                       'l': 'rgb(255, 165,   0)',
                       'o': 'rgb(255, 255,   0)',
                       's': 'rgb(  0, 255,   0)',
                       'i': 'rgb(  0, 255, 255)',
                       'j': 'rgb(  0,   0, 255)',
                       't': 'rgb(160,  32, 240)', 
                       'x': 'rgb(127, 127, 127)'};
        this.key_hold = [0, 0, 0]; // [move_left, soft_drop, move_right]
        this.lock_delay = {'time': 500, 'count': 15};
        this.mode = '';
        this.start_level = 0;
        this.bindings = {'quit'      : 'Escape',
                         'reset'     : 'KeyR',
                         'hold'      : 'KeyV',
                         'move_left' : 'ArrowLeft',
                         'move_right': 'ArrowRight',
                         'rotate_cw' : 'KeyC',
                         'rotate_180': 'KeyZ',
                         'rotate_ccw': 'KeyX',
                         'soft_drop' : 'ArrowDown',
                         'hard_drop' : 'ArrowUp'};
        this.handling = {'DAS': 150, 'ARR': 30, 'SDF': 20};

        this.seed = undefined;
        this.paused = true;
        this.finished = 0;
    }

    set_mode(mode)         { this.mode = mode; }
    set_level(level)       { this.start_level = level;}
    set_bindings(bindings) { Object.assign(this.bindings, bindings); }
    set_handling(handling) { Object.assign(this.handling, handling); }

    get_macro_state() {
        return {
            position: this.position,
            rotation: this.rotation,
            board: this.board,
            piece: this.piece,
            held: this.held,
            hold_used: this.hold_used,
            queue: this.queue,
            score: this.stats.score,
            finished: this.finished
        };
    }
    get_micro_state() {
        return {
            position: this.position,
            rotation: this.rotation
        };
    }

    action_handler(type, time, params) {
        if (this.finished) {
            if (!this.paused && type === 'pause') return this.pause(time); // when finished, only take pause if not paused
            if (this.paused && type === 'reset') return this.reset(time, params?.seed); // when finished, only take reset if paused
            return;
        } else if (this.paused) {
            const PAUSED_ALLOWED = new Set(['reset', 'start', 'pause', 'move_left_press', 'move_left_release', 'move_right_press', 'move_right_release', 'soft_drop_press', 'soft_drop_release']);
            if (!PAUSED_ALLOWED.has(type)) return; // when not finished but paused, only allow certain actions
        } else {
            if (this.frame_update(time)) return; // when not finished and not paused, update the game state
        }

        switch (type) {
            case 'reset':              return this.reset(time, params?.seed);
            case 'start':              return this.start(time);
            case 'pause':              return this.pause(time);
            case 'move_left_press':    return this.move_press(-1, time);
            case 'move_left_release':  return this.move_release(-1, time);
            case 'move_right_press':   return this.move_press(1, time);
            case 'move_right_release': return this.move_release(1, time);
            case 'soft_drop_press':    return this.soft_drop_press(time);
            case 'soft_drop_release':  return this.soft_drop_release(time);
            case 'rotate_cw':          return this.rotate(1, time);
            case 'rotate_180':         return this.rotate(2, time);
            case 'rotate_ccw':         return this.rotate(3, time);
            case 'hard_drop':          return this.hard_drop(time);
            case 'hold':               return this.hold(time);
            default:                   console.warn(`Unknown action type: ${type}`);
        } 
    }

    reset_mode() {
        if (Tetra.CUSTOMIZATIONS[this.mode]) Object.assign(this.customizations, Tetra.CUSTOMIZATIONS[this.mode]);

        if (this.mode === 'classic') {
            this.stats.DAS = 300;
            this.stats.ARR = 100;
            this.stats.SDF = 33;
        }
        if (!this.customizations.kick) ['t', 'i'].forEach(x => [0, 1, 2, 3].forEach(y => [0, 1, 2, 3].forEach(z => this.kicks[x][y][z] = [[0, 0]])));
        if (!this.customizations.r180) ['t', 'i'].forEach(x => [0, 1, 2, 3].forEach(y => this.kicks[x][y][(y + 2) % 4] = []));
        if (this.customizations.cheese > 0) this.add_cheese(null, this.customizations.cheese);
        if (this.customizations.four_wide) {
            for (let r = 0; r < 40; r++) this.board[r] = ['x', 'x', 'x', null, null, null, null, 'x', 'x', 'x'];
            this.board[0][3] = 'x';
            this.board[1][3] = 'x';
            this.board[1][4] = 'x';
        }
    }

    reset(current_time, seed) {
        this.seed = seed ?? Math.floor(Math.random() * 1000000);
        this.paused = true;
        this.finished = 0;
        this.board = [...new Array(40)].map(() => new Array(10).fill(null));
        this.held = null;
        this.hold_used = false;

        this.b2b = -1;
        this.combo = -1;
        this.last_clear = '';
        this.finesse_keys = 0;

        this.stats = Object.fromEntries(Tetra.STAT_NAMES.map(name => [name, 0]));
        Object.keys(this.handling).forEach(x => this.stats[x] = this.handling[x]);
        this.stats.mode = this.mode;
        this.stats.level = this.start_level;
        this.stats.seed = this.seed;

        this.customizations = { ...Tetra.CUSTOMIZATIONS.default };
        this.kicks = structuredClone(Tetra.DEFAULT_KICKS);
        this.reset_mode();
        this.queue = this.shuffle(Object.keys(Tetra.MINOS), this.customizations.queue_type);

        this.update_gravity();
        this.finish_time = null;
        this.gravity_time = null;

        this.das_time = null;
        const key_hold_old = this.key_hold;
        this.key_hold = [0, key_hold_old[1], 0];
        if (key_hold_old[0] === 1) this.move_press(-1, current_time);
        else if (key_hold_old[2] === 1) this.move_press(1, current_time);
        if (key_hold_old[0] === 2) this.move_press(-1, current_time);
        else if (key_hold_old[2] === 2) this.move_press(1, current_time);

        return { seed: this.stats.seed };
    }

    start(current_time) {
        this.paused = false;
        this.stats.keys = 0;
        this.stats.time = current_time;
        if (this.mode === 'blitz') this.finish_time = current_time + 120000;
        if (this.das_time) this.das_time = (this.das_time < current_time) ? current_time : this.das_time;

        this.new_piece(this.queue.shift(), current_time);
    }

    stop(current_time, result = 1) {
        this.finished = result;
        this.stats.time = current_time - this.stats.time;
        if (['marathon', 'classic', 'finesse', '4-wide'].includes(this.stats.mode)) this.finished = 1;
    }

    pause(current_time) {
        if (this.finished) {
            this.paused = true;
            return;
        }
        if (this.paused) {
            this.stats.time = current_time - this.stats.time;
            if (this.lock_time !== null) this.lock_time += current_time;
            if (this.finish_time !== null) this.finish_time += current_time;
            this.gravity_time += current_time;
            const new_gravity_time = current_time + this.gravity;
            this.gravity_time = (this.gravity_time < new_gravity_time) ? this.gravity_time : new_gravity_time;

            // Reassign das_time by calling appropriate move_press to properly increment keys
            this.das_time = null;
            const key_hold_old = this.key_hold;
            this.key_hold = [0, key_hold_old[1], 0];
            if (key_hold_old[0] === 1) this.move_press(-1, current_time);
            else if (key_hold_old[2] === 1) this.move_press(1, current_time);
            if (key_hold_old[0] === 2) this.move_press(-1, current_time);
            else if (key_hold_old[2] === 2) this.move_press(1, current_time);

            this.paused = false; // needs to come after the move_press() calls
        } else {
            this.paused = true;

            this.stats.time = current_time - this.stats.time;
            if (this.lock_time !== null) this.lock_time -= current_time;
            if (this.finish_time !== null) this.finish_time -= current_time;
            this.gravity_time -= current_time;
        }
    }

    shuffle(a, queue_type, previous = null) {
        if (queue_type === 0) {
            const arr = [...a];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(this.mulberry32() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        } else if (queue_type === 1) {
            return Array.from({ length: a.length }, () => a[Math.floor(this.mulberry32() * a.length)]);
        } else if (queue_type === 2) {
            let arr = [];
            for (let i = 0; i < a.length; i++) {
                let current = a[Math.floor(this.mulberry32() * a.length)];
                if (current === previous) current = a[Math.floor(this.mulberry32() * a.length)];
                arr.push(current);
                previous = current;
            }
            return arr;
        }
    }

    new_piece(piece, current_time) {
        this.piece = piece;
        this.position = [3, 18];
        this.rotation = 0;

        if (this.collision()) {
            this.stop(current_time, -1);
            return;
        }
        if (this.queue.length < 8) this.queue.push(...this.shuffle(Object.keys(Tetra.MINOS), this.customizations.queue_type, this.queue[this.queue.length - 1]));

        this.gravity_time = current_time + this.gravity;
        this.lock_time = null;
        this.lock_count = 0;
        this.lock_lowest = 18;
        this.update_height();
        this.update_lock(current_time);
        this.last_action = '';
        this.finesse_keys = 0;
        if (this.stats.mode === 'classic') this.soft_drop_release(current_time);
        if (this.customizations.target) this.new_target();
    }

    new_target() {
        this.target = {};
        this.target.rotation = Math.floor(this.mulberry32() * 4);
        this.target.location = Math.floor(this.mulberry32() * Tetra.FINESSE[this.piece][this.target.rotation].length);
        const minos_piece_rotation = Tetra.MINOS[this.piece][this.target.rotation];
        this.target.position = [
            this.target.location - Math.min(...minos_piece_rotation.map(x => x[0])),
            -Math.min(...minos_piece_rotation.map(x => x[1]))];
    }

    hold(current_time) {
        if (this.customizations.allow_hold) {
            this.stats.keys++;
            if (!this.hold_used) {
                this.stats.holds++;
                this.hold_used = true;
                if (this.held === null) {
                    this.held = this.piece;
                    this.new_piece(this.queue.shift(), current_time);
                } else {
                    const temp = this.held;
                    this.held = this.piece;
                    this.new_piece(temp, current_time);
                }
            }
        }
    }

    rotate(turns, current_time) {
        this.stats.keys++;
        const actions = (turns % 2 === 1) ? 1 : 2;
        this.finesse_keys += actions;
        const orig_position = [...this.position];
        const orig_rotation = this.rotation;
        this.rotation = (this.rotation + turns) % 4;
        const kicks_piece_rotation = this.kicks[(this.piece === 'i') ? 'i' : 't'][orig_rotation][this.rotation];
        for (let i = 0; i < kicks_piece_rotation.length; i++) {
            const [x, y] = kicks_piece_rotation[i];
            this.position = [orig_position[0] + x, orig_position[1] + y];
            if (!this.collision()) {
                this.update_height();
                this.update_lock(current_time, actions);
                this.last_action = `rotate${i}`;
                return;
            }
        }
        this.position = orig_position;
        this.rotation = orig_rotation;
    }

    move(distance, current_time) {
        const step = (distance > 0) ? 1 : -1;
        let i = 0;
        while (i < Math.abs(distance)) {
            this.position[0] += step;
            if (this.collision()) {
                this.position[0] -= step;
                if (i === 0) return;
                break;
            }
            i++;
        }
        this.update_height();
        this.update_lock(current_time, i);
        this.last_action = 'move';
    }

    move_press(direction, current_time) {
        this.stats.keys++;
        this.finesse_keys++;
        this.key_hold[direction + 1] = this.key_hold[1 - direction] + 1;
        this.das_time = current_time + this.stats.DAS;

        if (!this.paused) this.move(direction, current_time);
    }

    move_release(direction, current_time) {
        const opposite = 1 - direction;
        this.key_hold[direction + 1] = 0;
        if (this.key_hold[opposite] === 0) {
            this.das_time = null;
        } else if (this.key_hold[opposite] === 1) {
            this.das_time = current_time + this.stats.DAS; // DAS added back to prevent "DAS skip"
        } else {
            this.key_hold[opposite] = 1;
        }
    }

    drop(distance, current_time) {
        distance = Math.min(distance, this.height);
        if (distance <= 0) return;
        this.position[1] -= distance;
        this.update_height();
        this.update_lock(current_time);
        this.stats.score += distance * this.key_hold[1];
        this.last_action = 'drop';
    }

    soft_drop_press(current_time) {
        this.stats.keys++;
        this.finesse_keys++;
        this.key_hold[1] = 1;
        this.update_gravity();
        this.gravity_time = current_time + this.gravity;

        if (!this.paused) {
            if (this.height > 0) {
                if (this.stats.SDF < 1) this.drop(40, current_time);
                else this.drop(1, current_time);
            }
        }
    }

    soft_drop_release(current_time) {
        this.key_hold[1] = 0;
        this.update_gravity();
        this.gravity_time = current_time + this.gravity;
    }

    hard_drop(current_time) {
        if (this.customizations.allow_hd) {
            this.stats.keys++;
            if (this.height > 0) {
                this.position[1] -= this.height;
                this.stats.score += this.height * 2;
                this.last_action = 'drop';
            }
            this.lock(current_time);
        }
    }

    lock(current_time) {
        if (Tetra.MINOS[this.piece][this.rotation].every(d => this.position[1] + d[1] >= 20)) {
            this.stop(current_time, -1);
            return;
        }

        this.stats.pieces++;
        this.f_check(current_time);
        if (!this.customizations.target) {
            Tetra.MINOS[this.piece][this.rotation].forEach(d => this.board[this.position[1] + d[1]][this.position[0] + d[0]] = this.piece);
            this.clear(current_time);
        }
        this.new_piece(this.queue.shift(), current_time);
        this.hold_used = false;
    }

    clear(current_time) {
        const t_score = this.t_check();
        let rows = 0;
        let cheese_cleared = 0;
        for (let r = 0; r < 40; r++) {
            if (this.board[r].some(x => x === null)) {
                this.board[rows] = this.board[r];
                rows++;
            } else if (r < this.customizations.cheese) {
                cheese_cleared++;
            }
        }
        const clear_count = 40 - rows;
        const is_pc = rows === 0;
        for (rows; rows < 40; rows++) {
            if (this.customizations.four_wide)
                this.board[rows] = ['x', 'x', 'x', null, null, null, null, 'x', 'x', 'x'];
            else
                this.board[rows] = new Array(10).fill(null);
        }
        this.add_cheese(current_time, cheese_cleared);
        const clear_string = Tetra.CLEAR_STRINGS[clear_count];
        if (clear_count > 0) {
            if (clear_count === 4 || t_score >= 10) {
                this.b2b++;
                if (this.b2b > this.stats['max b2b']) this.stats['max b2b'] = this.b2b;
            } else {
                this.b2b = -1;
            }
        }
        if (is_pc) {
            this.stats.score += Tetra.PC_SCORES[clear_count] * ((this.b2b > 0) ? 1.6 : 1) * this.stats.level;
            this.last_clear = `perfect clear ${clear_string}`;
        } else if (t_score > 10) {
            this.stats.score += Tetra.TSPIN_SCORES[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = `t-spin ${clear_string}`;
        } else if (t_score === 10) {
            this.stats.score += Tetra.MINI_TSPIN_SCORES[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = `mini t-spin ${clear_string}`;
        } else if (clear_count > 0) {
            this.stats.score += Tetra.LINE_SCORES[clear_count] * ((this.b2b > 0) ? 1.5 : 1) * this.stats.level;
            this.last_clear = clear_string;
        }
        if (clear_count > 0 || t_score >= 10) this.stats[this.last_clear]++;
        if (clear_count > 0) {
            this.combo++;
            this.stats.score += 50 * this.combo * this.stats.level;
            if (this.combo > this.stats['max combo']) this.stats['max combo'] = this.combo;
            this.stats.lines += clear_count;
            if (this.stats.mode === 'sprint' && this.stats.lines >= 40) this.stop(current_time, 1);
            else if (this.stats.lines >= this.stats.level * 10) {
                this.stats.level++;
                this.update_gravity();
            }
        } else {
            this.combo = -1;
            if (this.customizations.four_wide) this.stop(current_time, -1);
        }
    }

    t_check() {
        let t_score = 0;
        if (this.piece === 't' && this.last_action[0] === 'r') {
            const corners = [[0, 3], [2, 3], [2, 1], [0, 1]];
            for (let i = 0; i < 4; i++) {
                const [dc, dr] = corners[i];
                const c = this.position[0] + dc;
                const r = this.position[1] + dr;
                if (r < 0 || c < 0 || c > 9 || this.board[r][c] !== null) {
                    if (i === this.rotation || i === (this.rotation + 1) % 4) {
                        t_score += 4;
                    } else {
                        t_score += 3;
                    }
                }
            }
            t_score += this.last_action[6] === '4';
        }
        return t_score;
    }

    f_check(current_time) {
        const col = this.position[0] + Math.min(...Tetra.MINOS[this.piece][this.rotation].map(d => d[0]));
        if (this.customizations.target) {
            if (this.rotation % Tetra.ORIENTATIONS[this.piece] !== this.target.rotation % Tetra.ORIENTATIONS[this.piece] || col !== this.target.location) {
                this.stats.pieces--;
                this.stop(current_time, -1);
                return;
            }
        }
        for (let i = 0; i < 4; i++) {
            const [dc, dr] = Tetra.MINOS[this.piece][this.rotation][i];
            const c = this.position[0] + dc;
            const r = this.position[1] + dr;
            for (let j = r + 1; j < 22; j++) {
                if (this.board[j][c] !== null) return;
            }
        }
        if (this.finesse_keys > Tetra.FINESSE[this.piece][this.rotation][col]) {
            this.stats.finesse++;
            if (this.customizations.target) {
                this.stats.pieces--;
                this.stop(current_time, -1);
            }
        }
    }

    add_cheese(current_time, n, aligned = false) {
        if (n <= 0) return;
        n = (n > 40) ? 40 : n;
        for (let r = 40 - n; r < 40; r++) {
            if (this.board[r].some(x => x !== null)) {
                this.stop(current_time, -1);
                return;
            }
        }
        const aligned_gap = Math.floor(this.mulberry32() * 10);
        const new_cheese = [];
        for (let i = 0; i < n; i++) {
            const row = new Array(10).fill('x');
            const gap = aligned ? aligned_gap : Math.floor(this.mulberry32() * 10);
            row[gap] = null;
            new_cheese.push(row);
        }
        this.board.splice(40 - n, n);
        this.board.unshift(...new_cheese);
    }

    collision() {
        const board = this.board;
        const minos_piece_rotation = Tetra.MINOS[this.piece][this.rotation];
        const pos_x = this.position[0];
        const pos_y = this.position[1];

        for (let i = 0; i < 4; i++) {
            const delta = minos_piece_rotation[i];
            const c = pos_x + delta[0];
            const r = pos_y + delta[1];
            if (c < 0 || c > 9 || r < 0 || board[r][c] !== null) return true;
        }
        return false;
    }

    update_height() {
        const board = this.board;
        const minos_piece_rotation = Tetra.MINOS[this.piece][this.rotation];
        const pos_x = this.position[0];
        const pos_y = this.position[1];

        let new_height = 40;
        for (let i = 0; i < 4; i++) {
            const delta = minos_piece_rotation[i];
            const c = pos_x + delta[0];
            let r = pos_y + delta[1] - 1;

            let drop = 0;
            while (r >= 0 && board[r][c] === null) {
                drop++;
                r--;
            }
            if (drop < new_height) {
                new_height = drop;
                if (new_height === 0) break;
            }
        }
        this.height = new_height;
    }

    update_lock(current_time, actions = 0) {
        if (this.position[1] < this.lock_lowest) { // if the piece is the lowest it has been, it gets a new lock count
            this.lock_lowest = this.position[1];
            this.lock_count = 0;
        }
        if (this.lock_time) {
            if (this.height > 0) { // stop condition
                this.lock_time = null;
            } else if (actions > 0 && this.customizations.lock_type > 0) { // reset condition
                if (this.lock_count < this.lock_delay['count']) {
                    this.lock_time = current_time + this.lock_delay['time'];
                }
                this.lock_count += actions; // the action that grounds or ungrounds a piece does not count
            }
        } else if (this.height === 0) { // start condition
            this.lock_time = current_time + this.lock_delay['time'];
        }
    }

    update_gravity() {
        const level = this.stats.level
        if (this.mode === 'classic') {
            const frames = Math.max(1, Math.floor(48 * Math.pow(1.118, 1 - level)));
            this.gravity = frames / 60 * 1000
            if (this.key_hold[1] === 1) this.gravity = Math.min(this.gravity, this.stats.SDF);
        } else {
            this.gravity = Math.pow(0.8 - (level - 1) * 0.007, level - 1) * 1000;
            if (this.key_hold[1] === 1) this.gravity = (this.stats.SDF < 1) ? 0 : this.gravity / this.stats.SDF;
        }
    }

    gravity_tick(current_time) {
        if (this.gravity === 0) {
            this.drop(40, current_time);
            this.gravity_time += 1; // TODO: set to 0 and wake up with move and rotate
        } else {
            this.drop(1, current_time);
            this.gravity_time += this.gravity;
        }
    }

    das_tick(current_time) {
        const step = this.key_hold[2] - this.key_hold[0];
        if (this.stats.ARR === 0) {
            this.move(9 * step, current_time);
            this.das_time += 1; // TODO: set to 0 and wake up with drop and rotate 
        } else {
            this.move(step, current_time);
            this.das_time += this.stats.ARR;
        }
    }

    frame_update(current_time) {
        let next_time = Math.min(this.gravity_time ?? Infinity, this.lock_time ?? Infinity, this.das_time ?? Infinity, this.finish_time ?? Infinity);
        while (!this.finished && next_time < current_time) {
            if (this.das_time === next_time) {
                this.das_tick(next_time);
            }
            if (this.gravity_time === next_time) {
                this.gravity_tick(next_time);
            }
            if (this.lock_time === next_time) {
                this.lock(next_time);
            }
            if (this.finish_time === next_time) {
                this.stop(next_time, 1);
            }
            next_time = Math.min(this.gravity_time ?? Infinity, this.lock_time ?? Infinity, this.das_time ?? Infinity, this.finish_time ?? Infinity);
        }
        return this.finished;
    }

    mulberry32() {
        if (this.seed === undefined) return Math.random(); // Math.random if unseeded
        let t = (this.seed += 0x6D2B79F5);
        // let t = (this.seed = (this.seed + 0x6D2B79F5) | 0);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tetra;
}