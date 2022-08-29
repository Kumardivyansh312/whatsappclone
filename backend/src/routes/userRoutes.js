const {Router} = require('express')
const userControllers = require("../controllers/usersController")
const userAuthenMiddleware = require('../middlewares/userMiddleware')
const route = Router()

//Middleware to authenticate token
route.use('/changePassword', userAuthenMiddleware.verifyAuthenticatedUser )

//Public Route
route.get('/', userControllers.getAllUsers)
route.post('/register',userControllers.registerUser)
route.post('/login',userControllers.loginUser)

//Protected Route
route.post('/changePassword' , userControllers.changePassword)

module.exports = route
