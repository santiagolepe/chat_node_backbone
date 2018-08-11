import Backbone from 'backbone'
import _ from 'underscore'
import template from './viewMessage.html'

class ViewMessage extends Backbone.View {

  constructor (props) {
    super(props)
    this.template = _.template(template)
  }

  render () {
    this.$el.html(this.template({messages: this.collection.toJSON()}))
    var box_messages = document.getElementById('messages-box')
    box_messages.scrollTop = box_messages.scrollHeight
    return this
  }
}

export default ViewMessage