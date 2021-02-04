import express from 'express'
import { addProduct, allProducts, aProduct, updateProduct, vendorProducts, deleteProduct, deleteVendorProduct } from '../controllers/productController.js'
import { admin, vendor, vendorOrAdmin, verifyToken } from '../middleware/authorizationMiddleware.js'


const router = express.Router()

router.route('/')
    .get(allProducts)
    .post(verifyToken, vendor, addProduct)

router.route('/:id')
    .get(aProduct)
    .put(verifyToken, vendor, updateProduct)
    // .delete(verifyToken, admin, deleteProduct)
    .delete(verifyToken, vendor, deleteVendorProduct)

router.get('/vendors/:id', vendorProducts)


export default router
