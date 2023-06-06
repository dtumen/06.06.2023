const React = require('react');
const Layout = require('./Layout');

function SignInForm({ username, name }) {


  return (
    <Layout username={username}>
      <>
        <h2>Вход на сайт</h2>
        <form id="signinForm" method="POST" action="/auth/signin">
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              id="username"
              className="form-control"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              className="form-control"
              name="password"
              type="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
        <script src="/js/signin.js" />
      </>
    </Layout>
  );
}

module.exports = SignInForm;
