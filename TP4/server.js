var http = require("http");
var fs = require("fs");
var port = 7777;

function handler(res, pathFile, contentType) {
    fs.readFile(pathFile, function (err, data) {
        if (err) {
            console.log(pathFile + ":\n" + err);
            res.writeHead(404);
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    });
}

var server = http.createServer(function (req, res) {
    var urlData = req.url.split("/");
    
    var fn = urlData[urlData.length - 1];

    if(!isNaN(fn)){
        fs.readFile("dataset/arq" + fn + ".xml", function (err, data) {
            if (err) {
                res.writeHead(404);
                res.write("File arq"+fn+".xml not found");
                res.end();
            }else{  //page
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.write(data);
            res.end();
        }
        });
    }
    else if(fn.endsWith('.xsl')){
        handler(res, fn, "text/xsl; charset=utf-8")
    }
    else {  //otherwise -> invalid url.
        res.writeHead(404);
        res.write("File"+fn+"not found");
        res.end();      
    }
})

server.listen(port);
console.log("Port:" + port);