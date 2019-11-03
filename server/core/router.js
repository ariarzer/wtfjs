const path = require('path');

class Router {
  constructor(routes) {
    this.routes = [];
    routes.forEach(({ regexp, rout }) => {
      this.routes.push({
        regexp,
        path: require(path.join(__dirname, '..', '..', 'pages', rout)),
      });
    });
  }

  go(req, res) {
    const rout = req.url;
    let flag = true;
    this.routes.forEach(({ regexp, path }) => {
    console.log(rout, regexp, regexp.test(rout));
      if (!flag) {
        return false;
      }
      if (regexp.test(rout)) {
        path(req, res);
        flag = false;
      }
    });
  }
}

module.exports = Router;
