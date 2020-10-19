const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('security/certificate/key.pem'),
  cert: fs.readFileSync('security/certificate/cert.pem'),
  port: 8000,
};

https.createServer(options, function (req, res) {
  console.log ('- SECURE');
  res.writeHead (200, {'Content-Type': 'text/html'});
  res.write ('<h1>Hello World!</h1>\n');
  res.end ();
  // res.writeHead(200);
  // res.end("hello world\n");
}).listen(options.port);
console.log (`- Starting secure proxy server on port: ${options.port}`);

// let port;
//
// const https = require ('https');
// const http = require('http');
// const fs = require ('fs-extra');
//
// (async () => {
//   const options = {};
//
//   try {
//     // host: 'mycdn.local',
//     options.name = 'localhost';
//     options.port = 8443;
//     options.key = await fs.readFile (`security/certificate/key.pem`);
//     options.cert = await fs.readFile (`security/certificate/cert.pem`);
//     // options.key = await fs.readFile (`security/certificate/${options.name}.key`);
//     // options.cert = await fs.readFile (`security/certificate/${options.name}.crt`);
//
//     https.createServer (options, function (req, res) {
//       console.log ('- SECURE');
//       res.writeHead (200, {'Content-Type': 'text/html'});
//       res.write ('<h1>Hello World!</h1>');
//       res.end ();
//
//     }).listen (options.port);
//     console.log (`- Starting secure proxy server on port: ${options.port}`);
//   }
//   catch (err) {
//     console.error (err);
//   }
// })();


// port = 8080;
// const server = http.createServer(function (req, res) {
//   console.log ('- UN-SECURE');
//   res.writeHead (200, {'Content-Type': 'text/html'});
//   res.write ('<h1>Hello World!</h1>');
//   res.end();
// });
// server.listen (port);
// console.log (`- Starting un-secure proxy server on port: ${port}`);
