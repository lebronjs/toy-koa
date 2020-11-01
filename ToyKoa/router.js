class Router{
    constructor(){
        this.stack = []
    }
    register(path, method, middleware){
        let route = {path, method, middleware}
        this.stack.push(route)
    }
    get(path, middleware){
        this.register(path, "get", middleware)
    }
    post(path, middleware){
        this.register(path, "post", middleware)
    }
    routes(){
        let stack = this.stack
        return async function(ctx, next){
            let route = null
            const curPath = ctx.url
            const curMethod = ctx.method
            for (const item of stack) {
                if(item.path === curPath && item.method === curMethod){
                    route = item.middleware
                    break
                }else{
                    throw Error("404 not found")
                }
            }
            if(typeof route === "function"){
                route(ctx, next)
            }
            await next()
        }
    }
}

module.exports = Router