define(['underscore', 'backbone', 'jquery', 'models/session'], 
  function (_, Backbone, $, session) {
  'use strict';

  var token

  return {

    login: function (email, password) {
      var query = `
        mutation {
          login (email: "${email}", password: "${password}") {
            token
          }
        }
      `
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/graphql',
          contentType: 'application/json',
          dataType: 'json',
          type: 'POST',
          data: JSON.stringify({
            query: query
          })
        })
        .then(res => {
          if (res.errors) {
            reject(res.errors[0].message)
          } else {
            token = res.data.login.token
            this.getUser()
              .then(data => {
                session.set('user', data.me)
                resolve()
              })
              .catch(reject)           
          } 
        })  
      })
    },

    getUser: function () {
      let query = `{
        me {
          _id
          name
          email
          role
        }
      }`

      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/graphql',
          contentType: 'application/json',
          dataType: 'json',
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: JSON.stringify({
            query: query
          })
        })
        .then(resolve)
        .catch(reject)  
      })
    }

  }

})
