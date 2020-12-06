import express from 'express'
import { allProducts, aProduct } from '../controllers/productController.js'


const router = express.Router()

router.route('/').get(allProducts)

router.route('/:id').get(aProduct)


export default router
