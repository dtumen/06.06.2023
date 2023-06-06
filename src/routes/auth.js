const express = require('express');
const {isValid} = require("../middlewares/functs");

const {
  checkUserAndCreateSession,
  createUserAndSession, destroySession,
  renderSignInForm,
  renderSignUpForm
} = require("../controllers/authControllers");

const router = express.Router();

router
  .route('/signup')
  .get(renderSignUpForm) 
  .post(isValid,  createUserAndSession); 

router
  .route('/signin')
  .get(renderSignInForm) 
  .post(checkUserAndCreateSession); 

router.get('/signout', destroySession);

module.exports = router;
