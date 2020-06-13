exports.route = function (app) {
  config.modules.forEach(element => {
    let route = require(config.paths.modules + '/' + element + '/route.js')
    route.route(app)
  });
}