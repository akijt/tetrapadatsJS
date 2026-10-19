function load_config() {
    try {
        const saved = localStorage.getItem('tetra_config');
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.error('Failed to read tetra_config from localStorage:', e);
        return null;
    }
}

function save_config(config) {
    try {
        localStorage.setItem('tetra_config', JSON.stringify(config));
    } catch (e) {
        console.error('Failed to write tetra_config to localStorage:', e);
    }
}

let socket = {
    emit: () => {},
    on: () => {},
    connected: false
};

if (typeof io !== 'undefined') {
    socket = io();
    console.log('[Online] Connected to server.');
} else {
    console.log('[Offline] Running in local offline mode.');
}

const engine = new Engine();
const game = new Tetra();
const menu = new Menu(null, engine, game);

const config = load_config();
if (config) game.config_handler(config);

socket.on('game_state', (data) => {
    if (!game.server_game) game.server_game = {};
    Object.assign(game.server_game, data);
});

engine.run(menu);