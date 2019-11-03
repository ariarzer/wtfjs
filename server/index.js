const http = require('http');
const Router = require('./core/router.js');
const createDB = require('./core/db.js');

const users = createDB('users');
const questions = createDB('questions');

const router = new Router([
  {
    regexp: /\/[^]*/,
    rout: 'main.js',
  },
  {
    regexp: /\/main\.js/,
    rout: 'main.js',
  },
  {
    regexp: /\/about\.js/,
    rout: 'about.js',
  },
  {
    regexp: /api\/setResult[^]*/,
    rout: 'setResult.js',
  },
  {
    regexp: /api\/addUser[^]*/,
    rout: 'addUser.js',
  },
]);

const server = new http.Server();

server.on('request', (req, res) => {
  router.go(req, res);
  res.end();
});

server.listen(process.env.PORT || 8080);

process.on('SIGINT', () => {
  users.unmount();
  process.exit();
});
