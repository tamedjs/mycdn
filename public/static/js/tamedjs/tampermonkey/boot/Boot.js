'use strict';
(function () {
  window.global = window;
  let mainConfig;

  class Boot {
    static buildUrl ({ config, path = '' }) {
      let port, url;

      port = '';
      if (!config) { config = mainConfig; }
      if (config.port) { port = `:${config.port}`; }
      url = `${config.protocol}://${config.domain}${port}${path}`;
      return url;
    }

    static getConfig () { return mainConfig; }

    static loadScript ({ url }) {
      let id, dom, mount;

      if (url) {
        // Ensure a mount area for scripts.
        id = 'mycdn-script-mount-area';
        mount = document.querySelector (`#${id}`);
        if (!mount) {
          mount = document.createElement ('div');
          mount.id = id;
          document.body.appendChild (mount);
        }

        // Load the script.
        dom = document.createElement ('script');
        dom.src = url;
        dom.type = 'module';
        mount.appendChild (dom);
      }
    }

    static start () {
      let base, config, url;

      console.log ('- MyCDN: Booting up the tools...');
      config = window ['localStorage'].getItem ('mycdn.config');
      window.__mycdn = {};
      window.__mycdn.Boot = Boot;

      // Default configuration.
      if (!config) {
        config = {
          protocol: 'http',
          domain: 'localhost',
          port: 3100,
          init: '/static/index.js',
        }
      }

      // Load the initialization script.
      mainConfig = config;
      base = Boot.buildUrl ({ config });
      url = Boot.buildUrl ({ config, path: config.init }) + `?_mycdn_set_base=${base}`;
      Boot.loadScript ({ url });
    }
  }

  // Boot up the app.
  Boot.start ();
})();
