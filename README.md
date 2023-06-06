# 06.06.2023

Пример реализации аутентификации с помощью `express`.

##  Для запуска проекта

 1. npm install

 2. psql postgres
    CREATE DATABASE sessiondb;
    CREATE USER userdb WITH ENCRYPTED PASSWORD 'userdb';
    GRANT ALL PRIVILEGES ON DATABASE sessiondb TO userdb;

  3. NODE_ENV="production" npx sequelize db:migrate
  4. NODE_ENV="production" npm run crsestable -  для создания в БД таблички для хранения сессий
  5. npx sequelize db:migrate -  для локальной бд
  6. npm run crsestable - для локальной бд

  7. npm run dev
# authSkeletonCookiePostgres