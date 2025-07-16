import express from 'express'
import { isAuth, login, logout, register, updateCart } from '../controllers/UserController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)
userRouter.post('/cart/update', authUser, updateCart);


export default userRouter;