const fs = require("fs")
const path = require("path")
const staticParser = require("../ToyKoa/staticParser")

module.exports=(dirPath="./public")=>{
    return async(ctx, next)=>{
        if(ctx.url.includes("/public")){
            const url = path.resolve(__dirname, dirPath)
            const fileBaseName = path.basename(url)
            const filePath = url + ctx.url.replace("/public","")
            console.log(ctx.url, url, fileBaseName, filePath);
            ctx.publicPath = url
            try {
                let stat = fs.statSync(filePath)
                if(stat.isDirectory()){
                    const dir = fs.readdirSync(filePath)
                    const ret = [`<div style="padding: 20px"><h2>目录</h2>`]
                    dir.forEach(fileName=>{
                        if(fileName.indexOf(".")>-1){
                            ret.push(`<p><a style="color:black" href="${ctx.url}/${fileName}">${fileName}</a></p>`)
                        }else{
                            // 文件夹
                            ret.push(`<p>📂 <a href="${ctx.url}/${fileName}">${fileName}</a></p>`)
                        }
                    })
                    
                    ret.push(`</div>`)
                    ctx.body = ret.join("")
                }else{
                    // 文件
                    const content = fs.readFileSync(filePath)
                    ctx.body = content
                    //fs.createReadStream(filePath).pipe(ctx.res);
                }
                staticParser(ctx, filePath)
            } catch (error) {
                console.log(error);
                ctx.body="404 not found"
            }
        }
        await next()
    }
}