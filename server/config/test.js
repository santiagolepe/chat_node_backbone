'use strict';

module.exports = {
  env: 'test',
  db: 'mongodb://localhost:27017/chat_test',
  db_conn: {
    useNewUrlParser: true
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
}