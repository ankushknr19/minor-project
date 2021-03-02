import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'


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