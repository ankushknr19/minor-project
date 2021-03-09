import express from 'express'
import { allProducts } from '../controllers/productController.js'
import { searchProducts } from '../controllers/searchController.js'

const router = express.Router()


router.route('/products?:query')
        .get(searchProducts)


export default router