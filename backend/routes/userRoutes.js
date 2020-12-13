import express from 'express'
import { userLogin, vendorLogin } from '../controllers/userControllers/userLoginController.js'
import { userRegister, vendorRegister } from '../controllers/userControllers/userRegisterController.js'
import { userProfile } from '../controllers/userControllers/userProfileController.js'
import { userProfileUpdate } from '../controllers/userControllers/userProfileUpdateController.js'
import { verifyToken } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
router.post('/login/vendor', vendorLogin)
router.post('/register/vendor', vendorRegister)
router
    .route('/profile')
    .get(verifyToken, userProfile)
    .put(verifyToken, userProfileUpdate)



export default router