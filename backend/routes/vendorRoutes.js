import express from 'express'
import { allVendors, aVendor } from '../controllers/vendorController.js'


const router = express.Router()

router.route('/').get(allVendors)

router.route('/:id').get(aVendor)


export default router
