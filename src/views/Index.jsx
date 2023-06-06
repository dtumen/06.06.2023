const React = require('react');
const Layout = require('./Layout');

function Index({username}) {

  return (
    <Layout username={username}>
      <h2>Главная страница!</h2>
    </Layout>
  );
}

module.exports = Index;
