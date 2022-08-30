const {Router} = require('express')
const userControllers = require("../controllers/usersController")
const userAuthenMiddleware = require('../middlewares/userMiddleware')
const route = Router()

//Middleware to authenticate token
route.use('/changePassword', userAuthenMiddleware.verifyAuthenticatedUser )
route.use('/loggedUser',userAuthenMiddleware.verifyAuthenticatedUser)

//Public Route
route.get('/', userControllers.getAllUsers)
route.post('/register',userControllers.registerUser)
route.post('/login',userControllers.loginUser)
route.post('/sendUserPasswordResetEmail',userControllers.sendUserPasswordResetEmail)
route.put('/userPasswordResetWithEmail/:id/:token',userControllers.userPasswordResetWithEmail)

//Protected Route
route.post('/changePassword' , userControllers.changePassword)
route.get('/loggedUser',userControllers.loggedInUserInProfile)

module.exports = route
