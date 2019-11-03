const url = require('url');

const createDB = require('../server/core/db.js');

const users = createDB('users');

module.exports = function addUser(req, res) {
  const urlParsed = url.parse(req.url, true);
  users.addUser(urlParsed.query.name);
  res.write(JSON.stringify(users.getAll()));
};
