import express from 'express'
import { userLogin } from '../controllers/userControllers/userLoginController.js'
import { userRegister } from '../controllers/userControllers/userRegisterController.js'
import { userProfile } from '../controllers/userControllers/userProfileController.js'
import { userProfileUpdate } from '../controllers/userControllers/userProfileUpdateController.js'
import { verifyToken } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
router
    .route('/profile')
    .get(verifyToken, userProfile)
    .put(verifyToken, userProfileUpdate)



export default router