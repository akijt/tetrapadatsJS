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

const engine = new Engine();
const game = new Tetra();
const menu = new Menu(null, engine, game);

const config = load_config();
if (config) game.config_handler(config);

engine.run(menu);