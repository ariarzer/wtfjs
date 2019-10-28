const http = require('http');
const Router = require('./core/router.js');

const router = new Router({
  '/': 'main.js',
  '/main': 'main.js',
  '/about': 'about.js',
  '/favicon.ico': 'main.js',
});

const server = new http.Server();

server.on('request', (req, res) => {
  router.go(req.url, res);
  res.end();
});

server.listen(process.env.PORT || 8080);
