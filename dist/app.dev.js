"use strict";

var http = require("http");

var fs = require("fs");

var path = require("path");

var mime = {
  css: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml"
};
console.log(path.extname("./lbj2.jpeg").slice(1));
var server = http.createServer(function (req, res) {
  var filename = "./pinkCat.gif";
  var stat = fs.statSync(filename);
  var ext = path.extname(filename).slice(1);
  var type = mime[ext] ? mime[ext] : "application/octet-stream";
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": type + (type.indexOf("text") >= 0 ? "; charset=utf-8" : ""),
    "Content-Length": stat.size
  });
  fs.createReadStream(filename).pipe(res);
});
server.listen(5500, function () {
  console.log("listening on http://localhost:5500");
});