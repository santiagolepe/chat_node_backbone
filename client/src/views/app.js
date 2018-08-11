import Backbone from 'backbone'
import UserList from './userList'
import RoomList from './roomList'
import ViewMessage from './viewMessage'
import InviteUser from '../partials/inviteUser'
import users from '../collections/users'
import rooms from '../collections/rooms'
import Messages from '../collections/messages'
import io from 'socket.io-client'

let currentChat = 'room_public'

let chatsMessages = {
  room_public: new Messages([{ user: 'Administrator', message: 'Welcome to the chat' }])
}

class App extends Backbone.View {

  constructor (props) {
    super(props)

    // init clases
    this.userList = new UserList({el: '.box-users', collection: users })
    this.roomList = new RoomList({el: '.box-rooms', collection: rooms })
    this.inviteUser = new InviteUser({el: '#invite-box', collection: users})
    this.viewMessage = new ViewMessage({el: $('#messages-box'), collection: chatsMessages[currentChat] })

    this.$headerLeft = $('#header-left')

    // add scope socket
    this.socket = null

    // binding model session
    this.listenTo(this.model, 'change', this.render)
  }

  get events () {
    return {
      'submit #submit-message': 'sendMessage',
      'submit #submit-room': 'createRoom',
      'click .li-sender': 'selectChat',
      'click .li-invite': 'sendInvitation',
    }
  }

  render () {
    let logued = this.model.get('logued')
    let me = this.model.get('user')
    let token = this.model.get('token')

    // toggle buttons
    this.toggleBtns(logued)

    if (logued && me) {
      this.$headerLeft.html(this.template({name: me.name}))

      var socket = this.socket = io(window.host, {
        'query': 'token=' + token,
        path: '/ws'
      })

      socket.on('connect', _ => {

        // add public chat room
        rooms.add({name: 'Public', active: true, socket: 'room_public', count: 1})

        // ge the welcome message
        this.refreshMessages()

        // on just conected one user
        socket.on('join', user => {
          if (user._id === me._id) return false
          users.add(user)
          this.addChatModel(user)
        })

        socket.on('user_disconnect', id => {
          users.remove(users.where({'socket': id}))
          delete chatsMessages[id]
        })

        // all users connected
        socket.on('all_users', res => {
          res.forEach( c => {
            if (me._id != c._id) {
              users.push(c)
              this.addChatModel(c)
            }
          })
        })
        // get message from the ws
        socket.on('get_message', message => {
          let to
          if (message.to.includes('room_')) {
            to = message.to
            rooms.addCount(to)
          } else {
            to = message._id === me._id ? message.to : message.from
            users.addCount(to)
          }
          chatsMessages[to].add(message)
          this.refreshMessages()
        })

        let joinRoom = (room) => {
          if (chatsMessages[room.socket]) return false
          rooms.add(room)
          chatsMessages[room.socket] = new Messages()
        }
        // get new room
        socket.on('new_room', joinRoom)
        // invitation for join to private room
        socket.on('invite_room', data => {
          joinRoom(data)
          socket.emit('join_room', data)
        })

      })
    } 
  }

  sendInvitation (e) {
    let socket = e.target.id.split('invite_')[1]
    $('#modalInvite').modal('hide')
    this.socket.emit('invite_room', {room: currentChat, socket})
  }

  addChatModel (user) {
    if (!chatsMessages[user.socket]) {
      chatsMessages[user.socket] = new Messages()
    }    
  } 

  refreshMessages () {
    this.viewMessage.collection =  chatsMessages[currentChat]
    this.userList.render()
    this.roomList.render()
    this.viewMessage.render()
  }

  sendMessage (e) {
    e.preventDefault()
    let message = $('#input-send').val()
    this.socket.emit('message', {message, to: currentChat})
    $('#input-send').val('')
  }

  selectChat (e) {
    currentChat = e.target.id
    rooms.setActive(currentChat)
    users.setActive(currentChat)
    this.refreshMessages()
    if (currentChat.includes('room_') && currentChat !== 'room_public') {
      $('#invite-box').removeClass('hide')
    } else {
      $('#invite-box').addClass('hide')
    }
  }

  toggleBtns (logued) {
    if (logued) {
      $('#login-btn').addClass('hide')
      $('#signin-btn').addClass('hide')
    } else {
      $('#login-btn').removeClass('hide')
      $('#signin-btn').removeClass('hide')
    }
  }

  createRoom (e) {
    e.preventDefault()
    let room = $('#input-room').val()
    this.socket.emit('room', { room })
    $('#input-room').val('')    
  }
}

export default App