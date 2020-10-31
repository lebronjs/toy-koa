const ToyKoa = require("./ToyKoa/application")
const Router = require("./ToyKoa/router")
const static = require("./ToyKoa/static")

const app = new ToyKoa()
const router = new Router()
// app.use((req,res)=>{
//     res.writeHead(200)
//     res.end('666')
// })

app
    .use(async(ctx, next)=>{
        let startTime = Date.now()
        console.log("start==========================");
        await next()
        let endTime = Date.now()
        console.log(`${ctx.method} ${ctx.url}: ${endTime-startTime}ms`);
    })
    .use(static(__dirname + '/public'))
    .use(router.routes())
    

router.get("/list", function(ctx){
    ctx.body = "list page"
})

router.post("/list", function(ctx){
    ctx.body = "list post page"
})

app.listen(5000,function () {
    console.log('listening on http://localhost:5000');
})