import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'


// @desc    Create an order
// @route   POST /api/orders
// @access  Private/Customer
export const createOrder = asyncHandler(async (req, res) => {
    try {
        
            const createdOrder = await pool.query(` INSERT INTO orders
        (customer_id, total_price, shipping_address, is_paid, payment_id)
        VALUES($1,$2,$3,$4,$5) RETURNING * `,
        [
            req.customer.rows[0].customer_id,
            req.body.total_price,
            req.body.shipping_address,
            req.body.is_paid,
            req.body.payment_id
        ])

        const updatePayment = await pool.query(`UPDATE payments SET order_id = $1 WHERE payment_id = $2`,
        [
            createdOrder.rows[0].order_id,
            createdOrder.rows[0].payment_id
        ]
        )
    

        res.status(201).json(createdOrder.rows[0])
        
    } catch (error) {
        res.status(404).json(error.message)
    }
})


// @desc    Create order details
// @route   POST /api/orders/orderdetails
// @access  Private/Customer
export const createOrderDetails = asyncHandler(async (req, res) => {
    try {        
        
        const searchDB = await pool.query(`SELECT * FROM orders WHERE order_id=$1`, [req.body.order_id])

        if(searchDB.rows[0] == 0){
            res.status(404)
            throw new Error('Order not found')
        }
        else{
        const createdOrderDetails = await pool.query(` INSERT INTO order_details
        (order_id, customer_id, product_id, vendor_id, qty, price)
        VALUES($1,$2,$3,$4,$5,$6) RETURNING * `,
        [
            req.body.order_id,
            req.customer.rows[0].customer_id,
            req.body.product_id,
            req.body.vendor_id,
            req.body.qty,
            req.body.price,
        ])

        res.status(201).json(createdOrderDetails.rows)
    } 
    } catch (error) {
        res.status(404).json(error.message)
    }
})



// @desc    get all customer orders
// @route   GET /api/orders/customer
// @access  Private/Customer
export const allCustomerOrders = asyncHandler(async(req,res) => {
    try {
       const orders = await pool.query("SELECT * FROM  orders WHERE customer_id = $1 ORDER BY created_at DESC ", [req.customer.rows[0].customer_id])

        res.json(orders.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})



// @desc    get a customer order
// @route   GET /api/orders/customer/:id
// @access  Private/Customer
export const aCustomerOrder = asyncHandler( async(req,res) => {
    try {
        const order = await pool.query("SELECT * FROM  orders WHERE customer_id = $1 AND order_id = $2 ",
        [req.customer.rows[0].customer_id,
        req.params.id])

        if (order.rows[0]==0) {
            res.status(404)
            throw new Error('Order not found')
        } else {
            res.json(order.rows[0])
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
})

// @desc    get all order details list of an order
// @route   GET /api/orders/customer/:id/orderdetails
// @access  Private/Customer
export const orderDetailsCustomer = asyncHandler(async(req,res) => {
    try {
       const orderDetails = await pool.query("SELECT order_details.*, products.product_name, products.product_image, vendors.vendor_name FROM  order_details INNER JOIN products on order_details.product_id = products.product_id  INNER JOIN vendors on order_details.vendor_id = vendors.vendor_id WHERE order_id = $1 AND customer_id = $2  ORDER BY created_at DESC", 
       [
        req.params.id,
        req.customer.rows[0].customer_id
    ])

        res.json(orderDetails.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})

// @desc    get an order details
// @route   GET /api/orders/customer/orderdetails/:id
// @access  Private/Customer
export const oneOrderDetailsCustomer = asyncHandler(async(req,res) => {
    try {
       const orderDetails = await pool.query("SELECT * FROM  order_details WHERE order_details_id = $1 AND customer_id = $2 ", 
       [
        req.params.id,
        req.customer.rows[0].customer_id
    ])

        res.json(orderDetails.rows[0])
    } catch (error) {
        res.status(404).json(error.message)
    }
})