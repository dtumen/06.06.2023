const render = require('../lib/renderTemplate');
const Private = require('../views/Private');

exports.privatePage = (req, res) => {
  render(Private, { username: req.session?.user?.name }, res);
};
