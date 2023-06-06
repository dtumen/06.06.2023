const render = require('../lib/renderTemplate');
const Index = require('../views/Index')

exports.indexPage = (req, res, next) => {
  const name = req.session?.user?.name;
  render(Index, {username: name}, res);
}
