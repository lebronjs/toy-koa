const http = require("http")
const context = require("./context")
const request = require("./request")
const response = require("./response")


class ToyKoa{
    constructor(){
        this.middlewares = []
    }

    listen(...args){
        const server = http.createServer(async (req, res)=>{
            // 创建上下文
            const ctx = this.createContext(req, res)
            // 合成中间件
            const middlewaresFn = this.compose(this.middlewares) 
            middlewaresFn(ctx)
                .then(()=>{
                    ctx.body && res.end(ctx.body)
                })
                .catch((err)=> {
                    if (err.code === 'ENOENT') {
                        ctx.status = 404;
                    }
                    else {
                        ctx.status = 500;
                    }
                    let msg = err.message || 'Internal error';
                    ctx.res.end(msg);
                    // 触发error事件
                    //this.emit('error', err);
                })
            
        })
        server.listen(...args)
    }

    use(middleware){
        this.middlewares.push(middleware)
        return this
    }
    // 构建上下文
    createContext(req,res){
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
    // 中间件合成函数 - 洋葱模型
    compose(middlewares){
        return function(ctx){
            return dispatch(0)
            async function dispatch (i){
                let fn = middlewares[i]
                if(!fn){
                    return Promise.resolve()
                }else{
                    return Promise.resolve(
                        fn(ctx, function next(){
                            return dispatch(i+1)
                        })
                    )
                }
            }
        }
    }
}

module.exports = ToyKoa