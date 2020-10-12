import { loadMicroApp, registerMicroApps, setDefaultMountApp, start } from 'qiankun';
import 'zone.js';
import JSON5 from 'json5';

// TODO: Clean up this code and place in a library to
// publish on NPM repo.

window.getHostApp = function () { return HostApp; }

const state = {
  ready: {
    main: '',
    toMount: false,
    toShow: [],
  }
}

class HostApp {
  static addAdd() {
  }

  static async getConfig({ url }) {
    return fetch(`/config/sample-01.json5`)
      .then(res => res.text())
      .then((text) => {
        try {
          return JSON5.parse(text);
        }
        catch (err) {
          console.error(err);
        }
      });
  }

  static hideLoader() {
    let dom;
    dom = document.querySelector('#__init-loader');
    if (dom) {
      setTimeout(() => {
        dom.classList.add('done');
      }, 600);
    }
  }

  static kebabAppName({ id }) {
    if (id.indexOf('@') === 0) {
      id = 'app' + id.replace('@', '-').replace('/', '-');
    }
    else {
      id = `app-${id}-`;
    }
    return id;
  }

  static mountToMainApp({ dom, name }) {
    let parent;
    parent = document.querySelector('#app-mount-area');
    if (dom && parent) {
      console.log(`Re-mounting the app "${name}" to the main app.`);
      parent.appendChild(dom);
    }
  }

  // static showApp ({ props }) {

  static revealDom({ id }) {
    let dom, parent;

    parent = document.querySelector(`#host-main-app-container-child-mount-area`);
    dom = document.querySelector(`#pre-mount-${id}`);

    if (dom && parent) {
      dom = dom.children[0];
      parent.appendChild(dom);
      console.log('DOM:', parent, dom);
    }
    // console.log (`Show app "${id}"`)
    // HostApp.hideLoader ();
    // setTimeout (() => {
    //   HostApp.mountToMainApp ({ dom: props.container, name: props.name });
    // }, 100);
  }

  static showApp({ id }) {
    let dom, parent;

    if (!state.ready.toMount) {
      if (id === state.ready.main) {

        setTimeout(() => {
          state.ready.toMount = true;
          // console.log ('*** TRACE 1', id, state.ready.toShow);
          parent = document.querySelector(`#host-main-app-container`);
          dom = document.querySelector(`#pre-mount-${id}`);

          if (dom && parent) {
            dom = dom.children[0];
            parent.appendChild(dom);
            console.log('DOM:', parent, dom);

            // HostApp.revealDom ({ id });
            state.ready.toShow.forEach((id) => {
              HostApp.revealDom({ id });
            });
          }

          HostApp.hideLoader();
        }, 1000);
      }
      else {
        // console.log ('*** TRACE 1', id);
        state.ready.toShow.push(id);
      }
    }
    else {
      HostApp.revealDom({ id });
    }
  }

  static async start() {
    let config, list, parent;

    // Grab the config from some url.
    config = await HostApp.getConfig({ url: '' });
    list = [];

    // Load micro apps.
    parent = document.querySelector('#host-pre-mount-area');
    if (!parent) {
      parent = document.createElement('div');
      parent.id = 'host-pre-mount-area';
      document.body.appendChild(parent);
    }

    config.apps.forEach((item) => {
      let dom, id;

      // Format the dom id based on the app's name.
      id = 'pre-mount-' + HostApp.kebabAppName({ id: item.app.name });
      // if (item.app.name.indexOf ('@') === 0) {
      //   id = 'pre-mount-' + HostApp.kebabAppName ({ id });
      // }
      // else {
      //   id = `pre-mount-app-${id}`;
      // }

      // Create the mounting dom.
      dom = document.createElement('div');
      dom.id = id;
      parent.appendChild(dom);

      // Add the app's config.
      if (item.app.main) {
        state.ready.main = HostApp.kebabAppName({ id: item.app.name });
        item.app.container = `#${id}`;
        loadMicroApp(item.app, item.config);
      }
      else {
        item.app.container = `#${id}`;
        list.push(item.app);
      }
    });

    if (list.length) {
      registerMicroApps(list,
        {
          beforeLoad: [
            app => {
              console.log('[LifeCycle] %c%s before load %c%s', 'background-color: green; color: #fff', app.name);
            },
          ],
          beforeMount: [
            app => {
              console.log('[LifeCycle] before mount %c%s', 'background-color: green; color: #fff', app.name);
              // console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            },
          ],
          afterMount: [
            app => {
              console.log('[LifeCycle] after mount %c%s', 'background-color: green; color: #fff', app.name);
            },
          ],
          afterUnmount: [
            app => {
              console.log('[LifeCycle] after unmount %c%s', 'background-color: green; color: #fff', app.name);
              // console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            },
          ],
        },
      );
    }

    // Start up the system.
    // setDefaultMountApp('/my-account');
    start();
  }
}

HostApp.start();
