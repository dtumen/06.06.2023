const {privatePage} = require("../controllers/privatePageController");

const express = require('express');
const router = express.Router();


function isAuth(req, res, next) {
  if (req.session?.user) next();
  else res.redirect('/auth/signin');
}

router.get('/', isAuth, privatePage);

module.exports = router;
