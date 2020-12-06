const state: any = {}

export class HostAppClient {
  static kebabAppName ({ id }) {
    if (id.indexOf ('@') === 0) {
      id = 'app' + id.replace ('@', '-').replace ('/', '-');
    }
    else {
      id = `app-${id}-`;
    }
    return id;
  }

  static register ({ bootstrap, mount, name, unmount }) {
    HostAppClient.setup ();

    // Hook the app into the micro frontend qiankun host.

    (function (global: any) {
      let reset, style;
      reset = 'background-color: init; color: init; border-radius: none; padding: 0;';
      style = 'align-items: center; background-color: #1675e4; border-radius: 0; color: #fff; display: flex; padding: 4px 12px;';

      global [name] = {
        bootstrap: function (args) {
          console.log (`%c BOOTSTRAP:%c ${{name}}`, style, reset);
          return bootstrap (args);
        },
        mount: function (args) {
          console.log (`%c MOUNT:%c ${{name}}`, style, reset);
          return mount (args);
        },
        unmount: function (args) {
          console.log (`%c UNMOUNT:%c ${{name}}`, style, reset);
          return unmount (args);
        },
      };
    }) (window);
  }

  static setup () {
    let func;

    func = window ['getHostApp'];
    if (func) {
      state.hostApp = func ();
    }
  }

  static show ({ id }) {
    let { hostApp } = state;
    if (hostApp) {
      hostApp.showApp ({ id });
    }
  }
}
