import express from 'express'
import { cart, addCartItem, deleteCartItem, updateCartItem } from '../controllers/cartController.js'
import { customerAddress, addCustomerAddress, updateCustomerAddress, deleteCustomerAddress} from '../controllers/userControllers/userAddressController.js'
import { verifyToken, customer } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

router.route('/address')
        .get(verifyToken, customer, customerAddress)
        .post(verifyToken, customer, addCustomerAddress)
        .put(verifyToken, customer, updateCustomerAddress)
        .delete(verifyToken, customer, deleteCustomerAddress)
        

router.route('/cart')
        .get(verifyToken, customer, cart)    
        .post(verifyToken, customer, addCartItem)
        
router.route('/cart/:id')
        .delete(verifyToken, customer, deleteCartItem)
        .put(verifyToken, customer, updateCartItem)

export default router