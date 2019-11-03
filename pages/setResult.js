const url = require('url');

const createDB = require('../server/core/db.js');

const users = createDB('users');

module.exports = function setResult(req, res) {
  const urlParsed = url.parse(req.url, true);
  users.setResult(urlParsed.query.name, urlParsed.query.result);
  res.write(JSON.stringify(users.getAll()));
};
