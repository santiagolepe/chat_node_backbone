import Backbone from 'backbone'
import _ from 'underscore'
import User from '../models/user'
import template from './signin.html'

class Singin extends Backbone.View {

  constructor (props) {
    super(props)
    this.template = _.template(template)
    // binding mutations
    this.listenTo(this.model, 'change', this.render)
    this.render()
  }

  get events () {
    return {
      'submit #form-signin': 'signin',
    }
  }

  render () {
    this.$el.html(this.template(this.model.attributes))
  }

  signin (e) {
    e.preventDefault()
    var name = $('#name-signin').val()
    var username = $('#username-signin').val()
    var password = $('#password-signin').val()
    this.model.signin({name, username, password})
 }
}

export default Singin