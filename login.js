module.exports = () => {
  const router = new SingUpRouter()
  router.post('/', new ExpressRouterAdapter().adapt(router))
}

class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status().json(httpResponse.body)
    }
  }
}

// presentation
// signup-router
class SingUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCasa().signUp(email, password, repeatPassword)
    return {
      statusCode: 400,
      body: user
    }
  }
}

// Domain
// sognup-usecase
class SignUpUseCasa {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepositore().add(email, password, repeatPassword)
    }
  }
}

// infra 
// add-account-tepo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepositore {
  async add (email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
