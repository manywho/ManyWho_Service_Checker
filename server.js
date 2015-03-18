var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');

var app = express();

function apiProxy(host, port) {
    return function(request, response, next) {
        if (request.url.indexOf('/fetch') == 0) {
            var target = url.parse(request.url.replace('/fetch?url=', ''));

            var options = {
                hostname: target.hostname,
                port: target.port,
                path: target.path,
                method: request.method,
                headers: request.headers
            };

            var req = http.request(options, function (res) {
                response.writeHead(res.statusCode, res.headers);

                res.on('data', function (chunk) {
                    response.write(chunk);
                });
                res.on('end', function () {
                    response.end();
                })
            });

            if (Object.keys(request.body).length > 0) {
                // TODO: Deserializing then reserializing can't be the right way?!
                req.end(JSON.stringify(request.body));
            }

            req.end();
        }
    }
}

app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/app"));
app.use(apiProxy('localhost', 3000));

app.listen(3000);