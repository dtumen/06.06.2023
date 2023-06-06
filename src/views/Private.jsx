const React = require('react');
const Layout = require('./Layout');
function Private({ username }) {

  return (
    <Layout username={username}>
      <h3>Приватная страница</h3>
      <p>
        Эта страница доступна только тебе,
        {username}.
      </p>
    </Layout>
  );
}

module.exports = Private;
