import express from 'express'
import { customerAddress, addCustomerAddress } from '../controllers/userControllers/userAddressController.js'
import { verifyToken, customer } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router
    .route('/address')
    .get(verifyToken, customer, customerAddress)
    .post(verifyToken, customer, addCustomerAddress)

export default router