require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./src/albums');
const songs = require('./src/songs');
const ClientError = require('./src/exceptions/ClientError');

/**
 * Inisialisasi dan start server Hapi.js
 */
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: { origin: ['*'] },
    },
  });

  // Registrasi plugin modules
  await server.register([
    {
      plugin: albums,
    },
    {
      plugin: songs,
    },
  ]);

  // Global error handler untuk menangani semua jenis error
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // Handle client errors (4xx)
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // Handle server errors (5xx)
      if (!response.isServer) return h.continue;

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      console.error(response);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();