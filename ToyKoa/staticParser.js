const fs = require("fs")
const path = require("path")

module.exports =  function(ctx, filePath){
        const mime = {
            css: 'text/css',
            gif: 'image/gif',
            html: 'text/html',
            ico: 'image/x-icon',
            jpeg: 'image/jpeg',
            jpg: 'image/jpeg',
            js: 'text/javascript',
            json: 'application/json',
            pdf: 'application/pdf',
            png: 'image/png',
            svg: 'image/svg+xml',
            swf: 'application/x-shockwave-flash',
            tiff: 'image/tiff',
            txt: 'text/plain',
            wav: 'audio/x-wav',
            wma: 'audio/x-ms-wma',
            wmv: 'video/x-ms-wmv',
            xml: 'text/xml',
        };
        if (!ctx.url.includes(`/favicon.ico`)){
            const stat = fs.statSync(filePath);
            const ext = path.extname(filePath).slice(1);
            let type = "text/plain"
    
            if(stat.isDirectory()){
                type = 'text/html'
            }else{
                type = mime[ext] ? mime[ext] : 'application/octet-stream';
            }
        
            ctx.res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': type + (type.indexOf('text') >= 0 ? '; charset=utf-8' : ''),
                //'Content-Length': stat.size,
            });
        }
}