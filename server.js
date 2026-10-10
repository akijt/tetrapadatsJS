const ServerEngine = require('./serverengine.js');
const Tetra = require('./tetra.js');

const serverEngine = new ServerEngine(Tetra);
serverEngine.run();