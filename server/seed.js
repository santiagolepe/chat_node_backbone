const User = require('./models/user')

let admin = {
  name: 'Octavio',
  email: 'octavio@local.com',
  password: '123123123',
  role: 'admin'
}

let santiago = {
  name: 'Santiago',
  email: 'santiago@local.com',
  password: '123123123',
  role: 'user'
}

let lepe = {
  name: 'Lepe',
  email: 'lepe@local.com',
  password: '123123123',
  role: 'user'
}

User.remove({})
.then( _ => {
  User.create(admin)
  User.create(santiago)
  User.create(lepe)
  .then(user => {
    console.log('Seed: users')
  })
})