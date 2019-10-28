const path = require('path');

class Router {
  constructor(routes) {
    this.routes = {};
    Object.keys(routes).forEach((key) => {
      this.routes[key] = require(path.join(__dirname, '..', '..', 'pages', routes[key]));
    });
  }

  go(rout, res) {
    this.routes[rout](res);
  }
}

module.exports = Router;
