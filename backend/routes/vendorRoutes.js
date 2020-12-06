import express from 'express'
import asyncHandler from 'express-async-handler'
import vendors from '../data/vendors.js'
const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  res.json(vendors)
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const vendor = vendors.find((v) => v.vendorId === req.params.id)
  if (vendor) {
    res.json(vendor)
  } else {
    res.status(404).json({ message: 'vendor not found' })
  }
}))

export default router
