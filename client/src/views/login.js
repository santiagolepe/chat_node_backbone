import Backbone from 'backbone'
import _ from 'underscore'
import User from '../models/user'
import template from './login.html'

class Login extends Backbone.View {

  constructor (props) {
    super(props)
    this.template = _.template(template)
    // binding mutations
    this.listenTo(this.model, 'change', this.render)
    this.render()
  }

  get events () {
    return {
      'submit #form-login': 'login',
    }
  }

  render () {
    this.$el.html(this.template(this.model.attributes))
    return this
  }

  login (e) {
    e.preventDefault()
    var username = $('#username').val()
    var password = $('#password').val()
    this.model.login(username, password)
 }
}

export default Login