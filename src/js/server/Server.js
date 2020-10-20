const Sirloin = require ('sirloin');
const merge = require ('deepmerge');
const liveServer = require('live-server');

class Server {
  static getDefaults () {
    return {
      port: 5000,
    }
  }

  static setup (args = {}) {
    let { state = {} } = args;

    state = merge (Server.getDefaults (), state);
    return state;
  }

  static async start (args = {}) {
    let { liveserver, state = {} } = args;
    let app;

    // Use live server.
    if (liveserver) {
      const options = {
          port: 5000,
          root: './dist',
          cors: true,
          open: false,
          // file: 'index.html',
          wait: 1000,
      };
      liveServer.start (options);
      return;
    }

    // Create the server.
    state = Server.setup ({ state });
    app = new Sirloin(state);
    app.log.set({ quiet: true });

    // Use the '*' for a catch all route
    app.get('*', async (req, res) => {
      console.log (`${req.method} ${req.url}`);
    });

    return app;
  }

  static stop ({ app }) {
    app.http.server.close ();
  }
}

module.exports.Server = Server;
