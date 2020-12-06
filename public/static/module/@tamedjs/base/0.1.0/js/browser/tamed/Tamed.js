window.global = window;

const Boot = window.__mycdn.Boot;

export class Tamed {
  static async import (url) {
    let content, path;

    path = Boot.buildUrl ({ path: `/static${url}` });
    content = await fetch (`${path}`).then (data => data.text ());

    console.log ('url:', path);
    console.log ('content:', content);

    // let dom;
    // dom = document.createElement ('script');
    // dom.innerHTML = content;
    // dom.type = 'module';
    // document.body.appendChild (dom);

    const encodedJs = encodeURIComponent (content);
    const dataUri = 'data:text/javascript;charset=utf-8,' + encodedJs;
    import (dataUri).then (() => {
    });

    class Bob {
      static start () { console.log ('bobo...'); }
    }
    return { Bob };
  }

  static start () {
    console.log ('- TamedJs has started.');
  }
}

global.tm = Tamed;
