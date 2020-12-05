import redbird from 'redbird';
let proxy;

export class Proxy {
  static start () {
    // OPTIONAL: Setup your proxy but disable the X-Forwarded-For header
    proxy = redbird ({ port: 3100 });
    // proxy = redbird ({port: 3100, xfwd: false});

    // Route to any global ip
    proxy.register ('http://localhost:3100/static', 'http://localhost:3101/static');
    proxy.register ('http://localhost:3100', 'http://localhost:3101');
    proxy.register ('http://localhost:3100/api', 'http://localhost:3102');
  }
}
