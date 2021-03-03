import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'



// @desc    get all orders that has at least one order item of this vendor
// @route   GET /api/orders/vendor
// @access  Private/Vendor
export const vendorOrders = asyncHandler(async(req,res) => {
    try {
       const orders = await pool.query("SELECT orders.*, customers.name FROM  orders JOIN order_details on orders.order_id = order_details.order_id JOIN customers on orders.customer_id = customers.customer_id WHERE order_details.vendor_id = $1 ORDER BY orders.created_at DESC ",
       [
           req.vendor.rows[0].vendor_id
       ])

        res.json(orders.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})


// @desc    get all order details list of an order
// @route   GET /api/orders/vendor/:id/orderdetails
// @access  Private/Vendor
export const orderDetailsVendor = asyncHandler(async(req,res) => {
    try {
       const orderDetails = await pool.query("SELECT order_details.*, products.product_name, products.product_image FROM  order_details JOIN products on order_details.product_id = products.product_id WHERE order_details.order_id = $1 AND order_details.vendor_id = $2  ORDER BY created_at DESC", 
       [
        req.params.id,
        req.vendor.rows[0].vendor_id
    ])

        res.json(orderDetails.rows)
    } catch (error) {
        res.status(404).json(error.message)
    }
})



// @desc    get all "order details list" for a vendor
// @route   GET /api/orders/vendor/orderdetails
// @access  Private/Admin
export const orderDetailsListVendor = asyncHandler(async(req,res) => {
    try {
    //    const orderDetailsList = await pool.query("SELECT * FROM  order_details WHERE vendor_id = $1 ORDER BY created_at DESC ", [req.vendor.rows[0].vendor_id] )
       const orderDetailsList = await pool.query("SELECT order_details.*, products.product_name, products.product_image FROM order_details INNER JOIN products on order_details.product_id = products.product_id  WHERE order_details.vendor_id = $1 ORDER BY order_details.created_at DESC ", 
       [req.vendor.rows[0].vendor_id] )

        res.json(orderDetailsList.rows)
    } catch (error) {
        res.status(500).json(error.message)
    }
})