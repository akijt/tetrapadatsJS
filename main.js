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

socket.on('game_state', (data) => {
    if (!game.server_game) game.server_game = {};
    Object.assign(game.server_game, data);
});

engine.run(menu);