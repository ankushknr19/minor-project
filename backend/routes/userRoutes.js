import express from 'express'
import { userLogin } from '../controllers/userControllers/userLoginController.js'
import { userRegister } from '../controllers/userControllers/userRegisterController.js'


const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)

export default router