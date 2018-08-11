'use strict';

module.exports = {
  env: 'production',
  db: 'mongodb://localhost/chat',
  db_conn: {
    useNewUrlParser: true,
    user: 'chat', 
    pass: 'chat',
  },
  port: process.env.PORT || 3000
}