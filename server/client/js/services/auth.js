define(['underscore', 'backbone', 'jquery', 'models/session', 'events'], 
  function (_, Backbone, $, session, events) {
  'use strict';

  var token

  var setSession = function (res) {
    var me = res.data.me
    session.set('name', me.name)
    session.set('_id', me._id)
    session.set('logued', true)
    events.trigger('logued')
  }

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
              .then(res => {
                setSession(res)
                resolve()
              })
              .catch(reject)           
          } 
        })  
      })
    },

    signin: function (data) {
      let query = `
        mutation {
          signup (name:"${data.name}", email: "${data.username}", password: "${data.password}") {
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
            token = res.data.signup.token
            this.getUser()
              .then(res => {
                setSession(res)
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
    },

    getToken: function () {
      return token
    }

  }

})
