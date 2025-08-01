const SongsHandler = require('./handler');
const routes = require('./routes');
const SongsService = require('./service');
const SongsValidator = require('./validator');

/**
 * Plugin module untuk songs
 * Mendaftarkan semua routes dan dependencies untuk fitur songs
 */
module.exports = {
  name: 'songs',
  register: async (server) => {
    const service = new SongsService();
    const handler = new SongsHandler(service, SongsValidator);
    server.route(routes(handler));
  },
};
