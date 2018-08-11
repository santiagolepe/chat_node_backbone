'use strict';

const app = require('../app'),
  chai = require('chai'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  User = require('../models/user'),
  chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

let expect = chai.expect, user
let createUser = _ => {
  user = new User({
    name: 'Octavio',
    email: 'octavio@local.com',
    password: '123123123'
  })
  return user
}

// Testing User model
describe('User model', function () {

  before(function () {
    return User.remove()
  })
  beforeEach(function () {
    return createUser()
  })
  afterEach(function () {
    return User.remove()
  })

  it('should begin with empty users', function () {
    return expect(User.find({}).exec())
      .to.eventually.have.length(0)
  })

  it('should fail when duplicated email', function () {
    return user.save().then(_ => {
      return expect(createUser().save())
      .to.be.rejected
    })
  })

  it('should fail when no email', function () {
    user.email = ''
    return expect(user.save()).to.be.rejected
  })

  it('should success when google account and no email', function () {
    user.provider = 'google'
    user.email = ''
    return expect(user.save()).to.be.fulfilled
  })

  it('should success when facebook account and no email', function () {
    user.provider = 'facebook'
    user.email = ''
    return expect(user.save()).to.be.fulfilled
  })

  it('should fail when no password', function () {
    user.password = ''
    return expect(user.save()).to.be.rejected
  })

  it('should fail when 7 or less characters password', function () {
    user.password = '1234567'
    return expect(user.save()).to.be.rejected
  })

  describe('get the saved user', function () {
    beforeEach(function () {
      return user.save()
    })

    it('should fail authenticate with a invalid password', function () {
      expect(user.auth('wrongpass')).to.be.false
    })

    it('should authenticate with a valid password', function () {
      expect(user.auth('123123123')).to.be.true
    })
  })

})


// testing graphql, auth, login, sign in, log out
describe('User graphql:', function () {

  before(function () {
    return createUser().save()
  })

  describe('Signup and respond with token', function () {

    let mutation = ` mutation { 
        login (email: "octavio@local.com", password: "123123123") { 
          token 
        } 
    }`
    it('Signup (by email)', function (done) {
      request(app)
        .post('/graphql')
        .send({query: mutation })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body.data.login.token).to.be.exist
          done(err)
        })
    })
  })

  describe('GET token user local, graphql', function () {
    let token

    let login = `mutation { 
      login (email: "santiago@local.com", password: "99999999") { 
        token 
      } 
    }`
    let query = `{
      me {
        _id
        name
        email
        role
      }
    }`
    let signup = `mutation { 
      signup (name: "santiago", email: "santiago@local.com", password: "99999999") { 
        token 
      } 
    }`    
    it('should respond Incorrect email or password if email dont exist', function () {
      request(app)
        .post('/graphql')
        .send({query: login })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errors[0].message).to.be.equal('Incorrect email or password')
        })
    })

    it('should respond Incorrect email or password invalid password', function () {
      request(app)
        .post('/graphql')
        .send({query: login })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errors[0].message).to.be.equal('Incorrect email or password')
        })
    })

    it('should get token', function (done) {

      let login = ` mutation { 
        login (email: "octavio@local.com", password: "123123123") { 
          token 
        } 
      }`
      request(app)
        .post('/graphql')
        .send({query: login })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          token = res.body.data.login.token
          expect(token).to.be.exist
          done()
        })
    })

    // get error if not send JWT
    it('should get error when try to use route with jwt protection', function () {
      request(app)
        .post('/graphql')
        .send({query: query })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.errors[0].message).to.be.equal('token required')
        })
    })

    // sending jwt getting access
    it('should get user data when authenticated', function (done) {
      request(app)
        .post('/graphql')
        .send({query: query })
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.data.me._id).to.equal(user._id.toString())
          done(err)
        })
    })

    // signup
    it('Register user with graphql', function (done) {
      request(app)
        .post('/graphql')
        .send({query: signup })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.data.signup.token).to.be.exist
          done(err)
        })
    })
  })
})
