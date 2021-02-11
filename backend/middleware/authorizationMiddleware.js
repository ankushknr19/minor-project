import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import pool from '../database/db.js'

const verifyToken = asyncHandler(async (req, res, next) => {
  let jwtToken

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      jwtToken = req.headers.authorization.split(' ')[1]

      const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

      req.user = await pool.query("SELECT user_id, name, email,is_admin, is_vendor, is_customer from users WHERE user_id=$1", [payload.id])
      req.vendor = await pool.query("SELECT user_id, vendor_id from vendors WHERE user_id=$1", [payload.id])
      req.customer = await pool.query("SELECT user_id, customer_id from customers WHERE user_id=$1", [payload.id])

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!jwtToken) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.rows[0].is_admin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}
const vendor = (req, res, next) => {
  if (req.user && req.user.rows[0].is_vendor) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as vendor')
  }
}
const customer = (req, res, next) => {
  if (req.user && req.user.rows[0].is_customer) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as customer')
  }
}

const vendorOrAdmin = (req, res, next) => {
  if (req.user && (req.user.rows[0].is_vendor || req.user.rows[0].is_admin)) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin or vendor')
  }
}

export { verifyToken, admin, vendor, customer, vendorOrAdmin }