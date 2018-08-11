import Backbone from 'backbone'
import _ from 'underscore'
import template from './senderList.html'

class SenderList extends Backbone.View {

  constructor (props) {
    super(props)
    this.template = _.template(template)
    this.listenTo(this.collection, 'add', this.render)
    this.listenTo(this.collection, 'remove', this.render)
  }

  render () {
    this.$el.html(this.template({items: this.collection.toJSON()}))
    return this
  }
}

export default SenderList