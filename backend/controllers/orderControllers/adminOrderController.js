import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'


// @desc    get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const allOrders = asyncHandler(async(req,res) => {
    try {
       const orders = await pool.query("SELECT * FROM  orders ")

        res.json(orders.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

// @desc    get an order
// @route   GET /api/orders/:id
// @access  Private/Admin
export const anOrder = async(req,res) => {
    try {
        const order = await pool.query("SELECT * FROM  orders WHERE order_id=$1",[req.params.id])

        if (order.rows[0]==0) {
            res.status(404)
            throw new Error('Order not found')
        } else {
            res.json(order.rows[0])
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}

// @desc    get all order details list of an order
// @route   GET /api/orders/:id/orderdetails
// @access  Private/Admin
export const orderDetails = asyncHandler(async(req,res) => {
    try {
       const orderDetails = await pool.query("SELECT * FROM  order_details WHERE order_id = $1 ", [req.params.id])

        res.json(orderDetails.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

// @desc    get an order details
// @route   GET /api/orders/orderdetails/:id
// @access  Private/Admin
export const oneOrderDetails = asyncHandler(async(req,res) => {
    try {
       const orderDetails = await pool.query("SELECT * FROM  order_details WHERE order_details_id = $1 ", [req.params.id])

        res.json(orderDetails.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})