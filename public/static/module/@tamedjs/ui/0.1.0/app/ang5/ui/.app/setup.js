const pkg = require ('../package.json');
const fs = require ('fs-extra');
const JSON5 = require ('json5');
const { resolve, sep } = require ('path');
const format = require ('string-template');
const voca = require ('voca');
const glob = require ('fast-glob');

class Setup {
  static async loop ({ action, list = [] }) {
    let index;

    index = 0;
    async function next () {
      let item;

      item = list [index];
      if (item && action) { await action ({ index, item }); }
      index++;

      if (index < list.length) { await next(); }
    }

    await next();
  }

  static async copyTemplates ({ state }) {
    let content, item, list, src, dest;

    list = await glob(['.app/template/**/*']);
    console.log ('LIST:', list);

    if (list.length) {
      await Setup.loop({
        list,
        action: async ({ item }) => {
          src = resolve ('.', item);
          dest = item.split ('/');
          dest = dest.slice(2);
          dest = resolve.apply (null, dest);

          console.log (`\n  - Saving: ${item}`);
          console.log (`    - src: ${src}`);
          console.log (`    - dest: ${dest}`);

          content = await fs.readFile (src, 'utf8');
          content = format (content, state);

          await fs.ensureFile (dest);
          content = await fs.writeFile (dest, content, 'utf8');
        },
      });
    }
  }

  static async removeSetupScript ({ state }) {
    let dest, json;

    delete pkg.scripts ['app:setup'];
    pkg.name = state.fullNpmName;
    pkg.config.port = state.port;
    
    dest = resolve ('.', 'package.json');
    json = JSON.stringify (pkg, null, 2);
    await fs.writeFile (dest, json, 'utf8');
  }

  static async start () {
    let org, state;

    try {

      state = await fs.readFile (resolve ('.', '.app', 'config.json5'), 'utf8');
      state = JSON5.parse (state);

      state.host.domain = state.host.base;
      if (state.host.port) {
        state.host.domain = `${state.host.domain}:${state.host.port}`;
      }
      state.hostDomain = state.host.domain;

      org = '';
      if (state.org) {
        org = state.org + '/'
        state.fullName = `${org}${state.name}`;
        state.fullNpmName = `@${org}${state.name}`;
        state.nameSnakeCase = voca.snakeCase(state.name);
      }
      else {
        state.fullName = `${org}${state.name}`;
        state.fullNpmName = state.fullName;
      }

      console.log (`\n- Setting up the micro app: ${state.fullNpmName}`);
      await Setup.copyTemplates ({ state });
      console.log ('\n- All done setting up the micro app.\n');

      await Setup.removeSetupScript ({ state });
    }
    catch (err) {
      console.error (err);
    }

    return state;
  }
}

Setup.start ();
