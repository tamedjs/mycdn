const mainConfig = {
  resource: {
    alias: {},
    count: 0,
    list: [],
  },
};


export class Resource {
  static addResource ({ url }) {
    let config, item;

    config = mainConfig;
    item = { loaded: false, url };
    config.resource.alias [url] = item;
    config.resource.list.push (item);

    return item;
  }

  static ensureCssArea () {
    let id, mount;

    // Ensure a mount area for scripts.
    id = 'mycdn-css-mount-area';
    mount = document.querySelector (`#${id}`);
    if (!mount) {
      mount = document.createElement ('div');
      mount.id = id;
      document.body.appendChild (mount);
    }
    return mount;
  }

  static ensureScriptArea () {
    let id, mount;

    // Ensure a mount area for scripts.
    id = 'mycdn-script-mount-area';
    mount = document.querySelector (`#${id}`);
    if (!mount) {
      mount = document.createElement ('div');
      mount.id = id;
      document.body.appendChild (mount);
    }
    return mount;
  }

  static itemDone ({ item }) {
    let config, resource;

    config = mainConfig;
    resource = config.resource;

    resource.count++;
    resource.alias [item.url].loaded = true;

    if (resource.count >= resource.list.length) {
      console.log ('- All done');
    }
  }

  static load () {
    Resource.loadCss ({ url: Boot.buildUrl ({ path: '/static/module/uikit/3.5.10/uikit.min.css' }) });
    // Resource.loadCss ({ url: Boot.buildUrl ({ path: '/static/css/ui/style.less', less: true }) });
    // Resource.loadScript ({ url: Boot.buildUrl ({ path: '/static/module/less/3.12.2/less.min.js' }) });
    // Resource.loadScript ({ url: Boot.buildUrl ({ path: '/static/module/uikit/3.5.10/uikit.min.js' }) });
    // Resource.loadScript ({ url: Boot.buildUrl ({ path: '/static/module/uikit/3.5.10/uikit-icons.min.js' }) });
  }

  static loadCss ({ less, url }) {
    let dom, item, mount;

    // Load the script.
    mount = Resource.ensureCssArea ();

    item = Resource.addResource ({ url });
    dom = document.createElement ('link');
    dom.href = url;
    dom.rel = 'stylesheet';
    dom.addEventListener ('load', () => { Resource.itemDone ({ item }) });

    if (less) {
      dom.rel = 'stylesheet/less';
      dom.type = 'text/less';
    }

    // dom.type = 'text/css';
    mount.appendChild (dom);
  }

  static loadScript ({ type = '', url }) {
    let dom, item, mount;

    // Load the script.
    mount = Resource.ensureScriptArea ();

    item = Resource.addResource ({ url });
    dom = document.createElement ('script');
    dom.src = url;
    dom.type = type;
    dom.addEventListener ('load', () => { Resource.itemDone ({ item }) });

    mount.appendChild (dom);
  }

  static start () {
    Resource.load ();
  }
}
