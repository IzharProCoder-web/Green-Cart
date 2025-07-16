import express from 'express'
import { isSellerrAuth, sellerLogin, sellerLogout } from '../controllers/sellerControllers.js';
import authSeller from '../middlewares/authSeller.js';


const sellerRouter = express.Router();

sellerRouter.post('/login' , sellerLogin)
sellerRouter.get('/is-auth' ,authSeller ,isSellerrAuth)
sellerRouter.get('/logout' , sellerLogout)

export default sellerRouter