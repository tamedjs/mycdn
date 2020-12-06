const liveServer = require ('live-server');
const url = require ('url');
const { join, parse, resolve, sep } = require ('path');
const fs = require ('fs-extra');
const voca = require ('voca');

let base;

class MiddleWare {
  static resolveAlias ({ next, req, res }) {
    let path;

    path = process.cwd () + sep + join ('dist', req.url);
    // console.log ('path:', path);

    fs.readFile (path, function (err, content) {
      if (err) {
        console.error (`ERROR: Unable to read file - ${path}`);
        return next ();
      }

      content = content.toString ();
      content = voca.replaceAll (content, '~/', (base + '/'));
      // console.log ('content:', test);

      res.setHeader ('Content-Type', 'text/javascript');
      res.writeHead (200);
      res.write (content);
      res.end ();
    });
  }

  static transformJs (req, res, next) {
    let result;

    result = url.parse (req.url, { parseQueryString: true });
    if (result.query._mycdn_set_base) {
      base = result.query._mycdn_set_base + '/static';
      // console.log ('*** BASE:', base);
    }

    result = parse (req.url);
    // console.log ('parsed:', result);
    if (result.ext === '.js') {
      MiddleWare.resolveAlias ({ next, req, res });
    }
    else {
      next ();
    }
  }
}

const options = {
  port: 3101,
  cors: true,
  open: false,
  root: 'dist',
  wait: 100,
  logLevel: 2,
	middleware: [MiddleWare.transformJs]
};

liveServer.start (options);
