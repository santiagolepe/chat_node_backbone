import Backbone from 'backbone'

class Session extends Backbone.Model {

  constructor () {
    super({
      logued: false,
      user: null,
      token: null,
      error: null,
    })
  }

  login (username, password) {
    let query = `
      mutation {
        login (email: "${username}", password: "${password}") {
          token
        }
      }
    `
    $.ajax({
      url: `${window.host}/graphql`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        query: query
      })
    })
    .then(res => {
      if (res.errors) {
        this.set({error: res.errors[0].message})
      } else {
        this.set({token: res.data.login.token, error: null})
        this.getUser()
        $('#modalLogin').modal('hide')
      } 
    })
  }

  signin (data) {
    let query = `
      mutation {
        signup (name:"${data.name}", email: "${data.username}", password: "${data.password}") {
          token
        }
      }
    `
    $.ajax({
      url: `${window.host}/graphql`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        query: query
      })
    })
    .then(res => {
      if (res.errors) {
        this.set({error: res.errors[0].message})
      } else {
        this.set({token: res.data.signup.token, error: null})
        this.getUser()
        $('#modalSignin').modal('hide')
      } 
    })
  }

  getUser () {
    let query = `{
      me {
        _id
        name
        email
        role
      }
    }`
    $.ajax({
      url: `${window.host}/graphql`,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      headers: {
        'Authorization': `Bearer ${this.get('token')}`
      },
      data: JSON.stringify({
        query: query
      })
    })
    .then(({data}) => this.set({logued: true, user: data.me}) )    
  }
}

export default new Session()