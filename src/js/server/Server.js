const Sirloin = require ('sirloin');
const merge = require ('deepmerge');

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

  static async start ({ state }) {
    let app;
    
    // Create the server.
    state = Server.setup ({ state });
    app = new Sirloin(state);
    app.log.set({ quiet: true });

    // // Use the '*' for a catch all route
    // app.get('*', async (req, res) => {
    //   console.log (`${req.method} ${req.url}`);
    // });
    return app;
  }

  static stop ({ app }) {
    app.http.server.close ();
  }
}

module.exports.Server = Server;
