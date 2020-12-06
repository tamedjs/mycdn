import Vue from '~/module/vuejs/2.6.12/vue.js';
import { Panel } from '~/js/tamedjs/dev-panel/src/js/browser/panel/Panel.js';
import { loadMicroApp } from '~/js/tamedjs/dev-panel/src/js/browser/qiankun/index.js';

const template = `
<div id="mount-mycdn-dev-panel">
  <mycdn-dev-panel></mycdn-dev-panel>
</div>
`;

const mainConfig = {
  resource: {
    alias: {},
    count: 0,
    list: [],
  }
}

export class App {
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

  static itemDone ({ item }) {
    let config, resource;

    config = mainConfig;
    resource = config.resource;
    resource.count++;
    item.loaded = true;

    if (resource.count >= resource.list.length) {
      App.show ();
    }
  }

  static loadStyles ({ list }) {
    let config, mount, resource;

    config = mainConfig;
    resource = config.resource;
    mount = App.ensureCssArea ();

    list.forEach ((item) => {
      let dom;

      resource.alias [item.url] = item;
      resource.list.push (item);

      if (item.less) {
        fetch (item.url)
        .then (res => res.text ())
        .then (content => {
          less.render (content)
          .then (function (output) {
            dom = document.createElement ('style');
            dom.setAttribute ('data-url', item.url);
            dom.innerHTML = output.css;
            mount.appendChild (dom);
            App.itemDone ({ item });
          }, function (err) {
            console.log (`ERROR: There was a problem parsing the less file - ${item.url}`);
          });
        });
      }
      else {
        dom = document.createElement ('link');
        dom.href = item.url;
        dom.rel = 'stylesheet';
        dom.type = 'text/css';
        dom.addEventListener ('load', () => { App.itemDone ({ item }); });
        mount.appendChild (dom);
      }
    });
  }

  static show () {
    let dom;

    dom = document.createElement ('div');
    dom.innerHTML = template;
    document.body.appendChild (dom);
    new Vue ({ el: '#mount-mycdn-dev-panel' });
  }

  static start () {
    App.loadStyles ({
      list: [
        { url: '~/module/uikit/3.5.10/uikit.min.css' },
        { less: true, url: '~/js/tamedjs/dev-panel/src/js/browser/style.less' },
      ]
    });
  }
}
