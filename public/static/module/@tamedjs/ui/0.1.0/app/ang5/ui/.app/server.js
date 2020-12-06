const liveServer = require ('live-server');
const { resolve } = require ('path');
const pkg = require ('../package.json');
const fs = require ('fs-extra');
const JSON5 = require ('json5');
const redbird = require ('redbird');

class Server {
  static async start ({ state }) {
    let config, proxies, proxy, root;

    try {
      // Get the reverse proxy configurations.
      config = await fs.readFile (resolve ('.', '.app', 'config.json5'));
      config = JSON5.parse (config);

      // Check if we need to setup any local dev proxies.
      proxies = Object.keys (config.proxy.domains);
      if (proxies.length) {
        proxy = redbird ({
          port: config.proxy.port,
          bunyan: { level: config.proxy.log }
        });

        // Route to any global ip
        proxies.forEach ((key) => {
          let item;

          item = config.proxy.domains [key];
          proxy.register (key, item);
          console.log (`- PROXY: ${key} --> ${item}`);
        });
        console.log ('');
      }

      // start the server.
      root = resolve ('.', 'dist', config.name);
      state.port = config.port;
      state.root = root;
      state.file = 'index.html';
      state.watch = [resolve('.', 'dist')];

      await fs.ensureDir (state.root);
      process.chdir (state.root);

      liveServer.start (state);
    }
    catch (err) {
      console.error (err);
    }
  }
}

Server.start ({
  state: {
    cors: true,
    open: false,
    logLevel: 2,
  }
});
