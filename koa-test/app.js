/**
 * Koa-session默认确实是通过将session序列化后存储在客户端的
 */

const Koa = require('koa');
const session = require('koa-session');
const chalk = require('chalk');

let app = new Koa();

app.keys = ['tx'];

class Memory {
  constructor() {
    this.sotry = {};
  }

  get(key) {
    console.log('get:', key);
    return this.sotry[key];
  }

  set(key, sess) {
    console.log('set:', key, sess);
    this.sotry[key] = sess;
  }
  destroy(key) {
    console.log('destroy:', key);
    this.sotry = {};
  }
}

const CONFIG = {
  key: 'koa.story.sess' /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  // maxAge: 86400000,
  // httpOnly: true /** (boolean) httpOnly or not (default true) */,
  // signed: true /** (boolean) signed or not (default true) */,
  // secure: false /** (boolean) secure cookie*/,
  // sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,
  store: new Memory(), // 指定实现
};

app.use(session(CONFIG, app));

app.use(async ctx => {
  if (ctx.path === `/favicon.ico`) return;
  let n = ctx.session.count || 0;
  ctx.session.count = ++n;
  ctx.body = 'hello koa 666' + `<br/>` + `${JSON.stringify(ctx.session)}`;
});

app.listen(3000);

const log = content => color => console.log(chalk[color](content));

log(`listen on http://localhost:3000`)('green');
