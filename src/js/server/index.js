const liveServer = require("live-server");

const options = {
    port: 3101,
    cors: true,
    open: false,
    root: 'dist',
    wait: 100,
    logLevel: 2,
};

liveServer.start (options);
