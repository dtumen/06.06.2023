const render = require('../lib/renderTemplate');
const ErrorMSG = require('../views/ErrorMsg');

module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500)
  render(ErrorMSG, {username: req.session?.user?.name}, res);
};
