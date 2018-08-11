import Backbone from 'backbone'
import _ from 'underscore'
import template from './inviteUser.html'

class InviteUser extends Backbone.View {

  constructor (props) {
    super(props)
    this.template = _.template(template)
    this.render()
  }

  get events () {
    return {
      'click .btn-add-user': 'openList',
    }
  }

  render () {
    this.$el.html(this.template({items: this.collection.toJSON()}))
    return this
  }

  openList () {
    this.render()
    $('#modalInvite').modal('show')
  }

}

export default InviteUser