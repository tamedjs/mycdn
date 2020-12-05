import url from 'url';
import fs from 'fs-extra';
import { resolve } from 'path';
import voca from 'voca';
import { nanoid } from 'nanoid';

const os = require ('os');
let registry = {};
let history = [];

export class Cache {
  static clear () {
    console.log ('Clearing cache files...');
    history = [];
    registry = {};
    Cache.saveFiles ();
    Cache.removeRequestFiles ();
    return { success: true };
  }

  static formatFileName ({ location }) {
    let home, name, path, result;

    if (location) {
      result = url.parse (location);
      home = os.homedir ();
      name = 'bob';

      path = voca.slugify (`${result.protocol}-${result.host}-${result.pathname}`) + '.json';
      path = resolve (home, 'workspace', 'cache', 'session', name, 'request', path);
    }

    return path;
  }

  static getBasePath (args = {}) {
    let { extra = [] } = args;
    let name, path;

    name = 'bob';
    path = resolve (os.homedir (), 'workspace', 'cache', 'session', name);

    if (extra && extra.length) {
      path = resolve.apply (this, [path].concat (extra));
    }
    return path;
  }

  static async load (req, res) {
    let id;

    id = registry [req.params.url];
    if (id) {
      try {
        path = Cache.getBasePath ({ extra: ['request', `${id}.json`], location: req.params.url });
        content = JSON.parse (await fs.readFile (path));
      }
      catch (err) {
        console.error (`ERROR: Unable to read cached request - ${path}`);
        console.error (err);
      }
      return { success: true }
    }
    else {
      console.log (`- NOT in Cache: ${req.params.url} ${req.params.url}`)
      return { success: true }
    }
  }

  static async loadFile ({ name }) {
    let path;

    if (name) {
      path = resolve (Cache.getBasePath (), `${name}.json`);
      fs.readFile (path, (error, content) => {
        if (error) {
          console.error (`ERROR: Unable to load the "${path}" ${name} file.`)
          return error;
        }
        registry = JSON.parse (content.toString ());
      });
    }
  }

  static async removeRequestFiles (args = {}) {
    let path;
    path = Cache.getBasePath ({ extra: ['request'] });
    await fs.remove (path);
  }

  static async save (req, res) {
    let id, path;

    id = registry [req.params.url];
    if (id === undefined) {
      id = nanoid ();
      path = Cache.getBasePath ({ extra: ['request', `${id}.json`], location: req.params.url });

      try {
        console.log ('- Saving:', path);
        registry [req.params.url] = id;
        history.push ({ id, method: req.params.method, url: req.params.url });

        await fs.ensureFile (path);
        await fs.writeFile (path, JSON.stringify (req.params, null, 2));
      }
      catch (err) {
      }
    }

    return { success: true }
  }

  static async saveFile ({ data, name }) {
    let path;

    if (data && name) {
      registry = {};
      path = resolve (Cache.getBasePath (), `${name}.json`);
      await fs.ensureFile (path);
      await fs.writeFile (path, JSON.stringify (data, null, 2));
    }
  }

  static async saveFiles () {
    Cache.saveFile ({ data: registry, name: 'registry'});
    Cache.saveFile ({ data: history, name: 'history' });
  }

  static start () {
    let path;

    registry = {};
    history = [];

    Cache.loadFile ({ name: 'registry' });
    Cache.loadFile ({ name: 'history' });

    setInterval (async () => {
      Cache.saveFiles ();
    }, 1000);
  }
}

Cache.start ();
