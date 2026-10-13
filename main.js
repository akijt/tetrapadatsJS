const engine = new Engine();
const game = new Tetra();
const menu = new Menu(null, engine, game);
engine.run(menu);