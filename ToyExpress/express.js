const http = require("http")
const slice = Array.prototype.slice

class ToyExpress {
    constructor() {
      // 存放路径和中间件，all中存放的是调用use传入的路径和中间件
      this.routes = {
        all: [],
        get: [],
        post: []
      }
    }
    // 分离出路径和中间件，info.path中存放路径，info.stack 中存放中间件
    register(path) {
      const info = {};
      if (typeof path === 'string') {
        info.path = path;
        info.stack = slice.call(arguments, 1);
      } else {
        // 如果第一个参数不是一个路由，那么我们就假定第一个参数是一个根路由
        info.path = '/';
        info.stack = slice.call(arguments, 0);
      }
      return info;
    }
  
    use() {
      // 实际使用时，参数是通过use传递进来的
      // 将所有的参数传入到register函数中
      const info = this.register.apply(this, arguments);
      // info 是一个对象，info.path 中存放的是路径，info.stack 中存放的是中间件
      this.routes.all.push(info);
  
    }
  
    get() {
      const info = this.register.apply(this, arguments);
      this.routes.get.push(info);
  
    }
  
    post() {
      const info = this.register.apply(this, arguments);
      this.routes.post.push(info);
    }
  
    // 匹配use,get或post方法会执行的中间件
    match(method, url) {
      let stack = [];
      if (url === '/favicon.ico') {
        return stack;
      }
      // 获取routes
      let curRoutes = [];
      curRoutes = curRoutes.concat(this.routes.all);
      curRoutes = curRoutes.concat(this.routes[method]);
  
      curRoutes.forEach(routeInfo => {
        if (url.indexOf(routeInfo.path) === 0) {
          // 匹配成功
          stack = stack.concat(routeInfo.stack);
        }
      });
      return stack;
    }
  
    // 核心的 next 机制
    handle(req, res, stack) {
      const next = () => {
        // 拿到第一个匹配的中间件
        const middleware = stack.shift();
        if (middleware) {
          middleware(req, res, next);
        }
      };
      next();
    }
  
    // callback是一个(req, res) => {} 的函数
    callback() {
      return (req, res) => {
        // res.json 是一个函数，在express中使用时传入一个对象即可在屏幕中显示出来，这里实现了这个功能
        res.json = (data) => {
          res.setHeader('Content-type', 'application/json');
          res.end(
            JSON.stringify(data)
          );
        };
        res.send = (data)=>{
            res.end(data)
        }
        const url = req.url;
        const method = req.method.toLowerCase();
        // 找到需要执行的中间件(通过路径和method，有可能一个需要执行的中间件也没有)
        const resultList = this.match(method, url);
        this.handle(req, res, resultList);
      }
    }
  
    // express 中listen的作用不仅仅是监听端口，还要创建服务器
    listen(...args) {
      const server = http.createServer(this.callback());
      server.listen(...args);
    }
  }

  module.exports = ToyExpress