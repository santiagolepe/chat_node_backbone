import Backbone from 'backbone'
import User from '../models/user'

class UsersCollection extends Backbone.Collection {

  constructor (data) {
    super(data)
    this.model = User
  }

  setActive (socket) {
    this.each(user => {
      if (user.get('socket') === socket) {
        user.set({active: true})
      } else {
        user.set({active: false})
      }
    })
  }

  addCount (socket) {
    this.each(user => {
      if (user.get('socket') === socket) {
        user.set({count: user.get('count') + 1 })
      }
    }) 
  }

}

export default new UsersCollection()