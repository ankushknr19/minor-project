import express from 'express'
import { updateCountInStock } from '../controllers/orderControllers/qtyController.js'
import { addProduct, allProducts, aProduct, updateProduct, vendorProducts, deleteVendorProduct } from '../controllers/productController.js'
import { admin, customer, vendor, vendorOrAdmin, verifyToken } from '../middleware/authorizationMiddleware.js'


const router = express.Router()

router.route('/')
    .get(allProducts)
    .post(verifyToken, vendor, addProduct)

router.route('/:id')
    .get(aProduct)
    .put(verifyToken, vendor, updateProduct)
    .patch(verifyToken, customer, updateCountInStock)
    .delete(verifyToken, vendor, deleteVendorProduct)

router.get('/vendors/:id', vendorProducts)


export default router
