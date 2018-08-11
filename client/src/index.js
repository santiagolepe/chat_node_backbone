import style from './main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import _ from 'underscore'

import session from './models/session'
import Login from './views/login'
import Signin from './views/signin'
import App from './views/app'
import avatar from './partials/avatar.html'

// config host graphql development
window.host = 'http://localhost:3000'

//init modals
new Login({el: '#modal-login-el', model: session })
new Signin({el: '#modal-signin-el', model: session })

// init App
let app = new App({el:'.app', model: session })
app.template = _.template(avatar)




