import express from 'express'
import { customerLogin, vendorLogin } from '../controllers/userControllers/userLoginController.js'
import { customerRegister, vendorRegister } from '../controllers/userControllers/userRegisterController.js'
import { userProfile } from '../controllers/userControllers/userProfileController.js'
import { userProfileUpdate } from '../controllers/userControllers/userProfileUpdateController.js'
import { verifyToken } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.post('/login', customerLogin)
router.post('/register', customerRegister)
router.post('/login/vendor', vendorLogin)
router.post('/register/vendor', vendorRegister)
router
    .route('/profile')
    .get(verifyToken, userProfile)

router.put('/profile/update',verifyToken, userProfileUpdate)




export default router