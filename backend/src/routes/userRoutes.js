const {Router} = require('express')
const userControllers = require("../controllers/usersController")
const route = Router()

route.get('/', userControllers.getAllUsers)

route.post('/',userControllers.registerUser)

module.exports = route
