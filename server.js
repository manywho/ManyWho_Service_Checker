var express = require('express');
var http = require('http');
var url = require('url');

var app = express();

function apiProxy(host, port) {
    return function(request, response, next) {
        if (request.url.indexOf('/fetch') == 0) {
            var target = url.parse(request.url.replace('/fetch?url=', ''));

            var req = http.request({
                hostname: target.hostname,
                port: target.port,
                path: target.path,
                method: request.method,
                headers: request.headers
            }, function (res) {
                response.writeHead(res.statusCode, res.headers);

                res.on('data', function (chunk) {
                    response.write(chunk);
                });
                res.on('end', function () {
                    response.end();
                })
            });

            req.end();
        }
    }
}

app.use(express.static(process.cwd() + "/app"));
app.use(apiProxy('localhost', 3000));

app.listen(3000);