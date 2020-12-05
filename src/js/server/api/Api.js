import * as Sirloin from 'sirloin';
import { Cache } from './cache/Cache.js';

export class Api {
  static async handleGet (req, res) {
    return { success: true }
    // res.setHeader ('Content-Type', 'text/html; charset=utf-8');
    // return `Hi bob`;
  }

  static start () {
    const app = new Sirloin ({ port: 3102 });

    app.get ('/request/cache/clear', Cache.clear);
    app.post ('/request/cache/load', Cache.load);
    app.post ('/request/cache/save', Cache.save);
  }
}
