import http from 'http'

const server = http.createServer(function (req, res) {
  res.writeHead(200);
  res.end('Hello world');
});

server.listen(8000);