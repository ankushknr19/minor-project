import express from 'express'
import { allOrders, anOrder, orderDetails, oneOrderDetails } from '../controllers/orderControllers/adminOrderController.js'
import { allCustomerOrders, createOrder, aCustomerOrder, oneOrderDetailsCustomer, createOrderDetails, orderDetailsCustomer } from '../controllers/orderControllers/customerOrderController.js'
import { orderDetailsListVendor, vendorOrders, orderDetailsVendor } from '../controllers/orderControllers/vendorOrderController.js'
import createPayment from '../controllers/paymentController.js'
import { verifyToken, customer, admin, vendor } from '../middleware/authorizationMiddleware.js'

const router = express.Router()

// create an order
router.route('/')
        .post(verifyToken, customer, createOrder)

// get customer orders
router.route('/customer')
        .get(verifyToken, customer, allCustomerOrders)    
        
// get a customer order        
router.route('/customer/:id')
.get(verifyToken, customer, aCustomerOrder)

//create order details
router.route('/orderdetails')
.post(verifyToken, customer, createOrderDetails)

//view all order details list of an order
router.route('/customer/:id/orderdetails')
.get(verifyToken, customer, orderDetailsCustomer)

//view an order details
router.route('/customer/orderdetails/:id')
.get(verifyToken, customer, oneOrderDetailsCustomer)


// create new payment in payments table
router.route('/payment')
        .post(verifyToken,customer,createPayment)




//vendor

//view orders that has his items
router.route('/vendor')
        .get(verifyToken, vendor, vendorOrders)

//view all order details list of an order
router.route('/vendor/:id/orderdetails')
.get(verifyToken, vendor, orderDetailsVendor)

//view all of his order details
router.route('/vendor/orderdetails')
        .get(verifyToken, vendor, orderDetailsListVendor)



//admin
router.route('/')
        .get(verifyToken, admin, allOrders)

router.route('/:id')
        .get(verifyToken, admin, anOrder)


//view all order details list of an order
router.route('/:id/orderdetails')
.get(verifyToken, admin, orderDetails)

//view an order details
router.route('/orderdetails/:id')
.get(verifyToken, admin, oneOrderDetails)
        

export default router