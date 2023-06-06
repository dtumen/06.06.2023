const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const render = require('../lib/renderTemplate');
const SignInForm = require('../views/SignInForm');
const SignUpForm = require('../views/SignUpForm');


const failAuth = (res, err) => res.status(401).json({err: err});

exports.createUserAndSession = async (req, res, next) => {
  const {name, password, email} = req.body;
  console.log('req.body: ', req.body);
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    req.session.user = {id: user.id, name: user.name};
    console.log('Session Sucsess');
    res.status(200).end();
  } catch (err) {
    let errMsg = err.message;
    if(err.name==='SequelizeUniqueConstraintError') errMsg = err.errors[0].message
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
    failAuth(res, errMsg);
  }

};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const {name, password} = req.body;
  try {
    const user = await User.findOne({where: {name: name}, raw: true});
    if (!user) return failAuth(res, ' Неправильное имя/пароль');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return failAuth(res, ' Неправильное имя\\пароль');

    req.session.user = {id: user.id, name: user.name}; 
    res.status(200).end(); 
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
    failAuth(res, err.message);
  }

};

exports.destroySession = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid').redirect('/');
  });
};

exports.renderSignInForm = (req, res) =>
  render(SignInForm, { username: req.session?.user?.name }, res);

exports.renderSignUpForm = (req, res) =>
  render(SignUpForm, { username: req.session?.user?.name }, res);

