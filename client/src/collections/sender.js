import Backbone from 'backbone'

class Senders extends Backbone.Collection {

  constructor (data) {
    super(data)
  }

  setActive (socket) {
    this.each(room => {
      if (room.get('socket') === socket) {
        room.set({active: true})
      } else {
        room.set({active: false})
      }
    })
  }

  addCount (socket) {
    this.each(room => {
      if (room.get('socket') === socket) {
        room.set({count: room.get('count') + 1 })
      }
    }) 
  }

}

export default Senders