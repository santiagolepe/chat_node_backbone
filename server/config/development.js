'use strict';

module.exports = {
  env: 'development',
  db: 'mongodb://localhost:27017/chat_dev',
  db_conn: {
    useNewUrlParser: true
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
}