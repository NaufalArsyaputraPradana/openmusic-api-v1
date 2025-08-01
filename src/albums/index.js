const AlbumsHandler = require('./handler');
const routes = require('./routes');
const AlbumsService = require('./service');
const AlbumsValidator = require('./validator');

/**
 * Plugin module untuk albums
 * Mendaftarkan semua routes dan dependencies untuk fitur albums
 */
module.exports = {
  name: 'albums',
  register: async (server) => {
    const service = new AlbumsService();
    const handler = new AlbumsHandler(service, AlbumsValidator);
    server.route(routes(handler));
  },
};
