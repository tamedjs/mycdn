var proxy = require('redbird')({port: 3100});

// // OPTIONAL: Setup your proxy but disable the X-Forwarded-For header
// var proxy = require('redbird')({port: 80, xfwd: false});

// Route to any global ip
proxy.register('http://localhost:3100/static', 'http://localhost:3101/static');

// // Route to any local ip, for example from docker containers.
// proxy.register("example.com", "http://172.17.42.1:8001");
