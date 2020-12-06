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
    let data, id, result;

    result = {};
    id = registry [req.params.url];
    if (id) {
      try {
        path = Cache.getBasePath ({ extra: ['request', `${id}.json`], location: req.params.url });
        data = JSON.parse (await fs.readFile (path));
      }
      catch (err) {
        console.error (`ERROR: Unable to read cached request - ${path}`);
        console.error (err);
      }
      result.success = true;
      result.content = data.response;

      history.push ({ id, time: new Date().toLocaleString(), method: req.params.method, url: req.params.url });
      Cache.saveFile ({ data: history, name: 'history' });
    }
    else {
      console.log (`- NOT in Cache ${Date.now ()}: ${req.params.url}`)
      result.success = true;
    }

    return result;
  }

  static async loadFile ({ name }) {
    let data, path;

    if (name) {
      path = resolve (Cache.getBasePath (), `${name}.json`);
      fs.readFile (path, (error, content) => {
        if (error) {
          console.error (`ERROR: Unable to load the "${path}" ${name} file.`)
          return error;
        }

        data = JSON.parse (content.toString ());
        switch (name) {
          case 'history': history = data; break;
          case 'registry': registry = data; break;
        }
      });
    }
  }

  static async removeRequestFiles (args = {}) {
    let path;
    path = Cache.getBasePath ({ extra: ['request'] });
    await fs.remove (path);
  }

  static async save (req, res) {
    let fullUrl, id, path, result;

    result = {};
    fullUrl = req.params.request.url;
    id = registry [fullUrl];
    if (id === undefined) {
      id = nanoid ();
      path = Cache.getBasePath ({ extra: ['request', `${id}.json`], location: fullUrl });

      try {
        console.log ('- Saving:', path);
        registry [fullUrl] = id;

        await fs.ensureFile (path);
        await fs.writeFile (path, JSON.stringify (req.params, null, 2));
      }
      catch (err) {
        result.success = false;
        return result;
      }
      result.status = { saved: true }
    }
    else {
      result.success = true;
      result.status = { saved: false }
    }

    return result;
  }

  static async saveFile ({ data, name }) {
    let path;

    if (data && name) {
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
