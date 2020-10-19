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

  static async start (args = {}) {
    return;
    let { state = {} } = args;
    let app;

    // Create the server.
    state = Server.setup ({ state });
    app = new Sirloin(state);
    app.log.set({ quiet: true });

    // // Use the '*' for a catch all route
    // app.get('*', async (req, res) => {
    //   console.log (`${req.method} ${req.url}`);
    // });

    // You can also return HTML templates, strings, numbers and boolean values
    app.get('*', async (req, res) => {
      console.log (`${req.method} ${req.url}`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return '<h1>Hello world</h1>'
    })

    return app;
  }

  static stop ({ app }) {
    app.http.server.close ();
  }
}

module.exports.Server = Server;



// var proxy = require('redbird')({
//   port: 8080, // http port is needed for LetsEncrypt challenge during request / renewal. Also enables automatic http->https redirection for registered https routes.
//   // letsencrypt: {
//   //   // path: 'bob',
//   //   port: 8443 // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
//   // },
//   // ssl: {
//   //   // http2: true,
//   //   port: 8443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
//   //   cert: 'bob/server.cert',
//   //   key: 'bob/server.key',
//   // }
// });
//
// proxy.register("web.mit.edu", "http://127.0.0.1:5000");


// // Create the HTTPS proxy server in front of a HTTP server
// const httpProxy = require ('http-proxy');
// const fs = require ('fs-extra');
//
//
//
//
// function setupListeners ({ name = 'SOME-PROXY', target }) {
//   target.on('proxyReq', function(proxyReq, req, res, options) {
//     console.log(`\n--------------------`);
//     console.log(`PROXY ${name}: ${req.url} --> localhost:5000`);
//     // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
//   });
//
//   // Listen for the `error` event on `proxy`.
//   target.on('error', function (err, req, res) {
//     res.writeHead(500, {
//       'Content-Type': 'text/plain'
//     });
//
//     res.end('Something went wrong. And we are reporting a custom error message.');
//   });
//
//   // Listen for the `proxyRes` event on `proxy`.
//   target.on('proxyRes', function (proxyRes, req, res) {
//     console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
//   });
//
//   // Listen for the `open` event on `proxy`.
//   target.on('open', function (proxySocket) {
//     // listen for messages coming FROM the target here
//     proxySocket.on('data', hybiParseAndLogMessage);
//   });
//
//   // Listen for the `close` event on `proxy`.
//   target.on('close', function (res, socket, head) {
//     // view disconnected websocket connections
//     console.log('Client disconnected');
//   });
// }
//
//
// let proxy;
//
// proxy = httpProxy.createServer({
//   target: {
//     host: 'localhost',
//     port: 5000
//   },
// }).listen(8080);
// setupListeners ({ name: 'NORMAL-PROXY', target: proxy });


// proxy = httpProxy.createServer({
//   target: {
//     host: 'localhost',
//     port: 5000
//   },
//   ssl: {
//     // key: keys.serviceKey,
//     // cert: keys.certificate,
//     // ca: keys.clientKey,
//     key: fs.readFileSync('bob/server.key', 'utf8'),
//     cert: fs.readFileSync('bob/server.cert', 'utf8')
//     // key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
//     // cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
//   },
//   secure: false
// }).listen(8443);
// setupListeners ({ name: 'SECURE-PROXY', target: proxy });

// proxy2.on('proxyReq', function(proxyReq, req, res, options) {
//   console.log(`\n--------------------`);
//   console.log(`PROXY 2: ${req.url} --> localhost:5000`);
//   // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
// });


// // http server that redirects all requests to their corresponding
// // https urls, and allows standards-compliant HTTP clients to
// // prevent future insecure requests.
// const http = require ('http');
// var server2 = http.createServer(function(req, res) {
//   res.statusCode = 301;
//   res.setHeader('Location', 'https://' + req.headers.host.split(':')[0] + req.url);
//   res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
//   return res.end();
// });
// server2.listen(8080); // HTTP listener for the old HTTP clients


// const httpProxy = require ('http-proxy');
// const pem = require('pem')
//
// pem.createCertificate({ days: 1, selfSigned: false }, function (err, keys) {
//   if (err) {
//     throw err
//   }
//
//   // console.log(keys);
//
//   //
//   // Create the HTTPS proxy server in front of a HTTP server
//   //
//   httpProxy.createServer({
//     target: {
//       host: 'localhost',
//       port: 5000
//     },
//     ssl: {
//       key: keys.serviceKey,
//       cert: keys.certificate,
//       ca: keys.clientKey,
//       // key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
//       // cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
//     },
//     secure: false
//   }).listen(8443);
//
//   // // http server that redirects all requests to their corresponding
//   // // https urls, and allows standards-compliant HTTP clients to
//   // // prevent future insecure requests.
//   // var http = require('http');
//   // var server = http.createServer(function(req, res) {
//   //   res.statusCode = 301;
//   //   res.setHeader('Location', 'https://' + req.headers.host.split(':')[0] + req.url);
//   //   res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
//   //   return res.end();
//   // });
//   // server.listen(5005); // HTTP listener for the old HTTP clients
//
//   // console.log(keys);
//   // https.createServer({ key: keys.serviceKey, cert: keys.certificate }, function (req, res) {
//   //   res.end('o hai!')
//   // }).listen(443)
// });



// var kill = require ('kill-port');
// kill(8001, 'tcp')
// .then (() => {
//   // const proxy = require ('redbird') ({ port: 8000, xfwd: false });
//   // const proxy = require ('redbird') ({ port: 8000 });
//   //
//   // proxy.register('web.mit.edu', 'http://localhost:5000');
//   // proxy.register('www.gnu.org', 'http://localhost:5000');
//
//   var redb = require('redbird')({
//     port: 8080,
//     xfwd: false,
//     letsencrypt: {
//       path: "certs",
//       // port: 5001
//     },
//     ssl: {
//       port: 8443
//     }
//   });
//
//   redb.register("blender.org", "https://www.npmjs.com", {
//     ssl: {
//       letsencrypt: {
//         email: "john.doe@somedomain.com",
//         production: false
//       }
//     }
//   });
//
//
//   // // LetsEncrypt support
//   // // With Redbird you can get zero conf and automatic SSL certificates for your domains
//   // proxy.register('blender.org', 'http://localhost:5000', {
//     //   ssl: {
//       //     letsencrypt: {
//         //       email: 'john.doe@example.com', // Domain owner/admin email
//         //       // production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!,
//         //       // port: 9999
//         //     }
//         //   }
//         // });
// })
