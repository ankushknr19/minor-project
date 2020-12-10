import express from 'express'
import { allProducts, aProduct, vendorProducts } from '../controllers/productController.js'


const router = express.Router()

router.route('/').get(allProducts)

router.route('/:id').get(aProduct)

router.get('/vendors/:id', vendorProducts)


export default router
