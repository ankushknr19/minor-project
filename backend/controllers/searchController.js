import pool from '../database/db.js'
import asyncHandler from 'express-async-handler'

// product search
// @desc    sql standard search by pattern
// @route   GET /api/search/products?product=name
// @access  Public
export const searchProducts = async(req,res) => {
    console.log(req.query.product);
    try {
        const product = await pool.query(`SELECT * FROM products WHERE product_name ILIKE $1 AND is_active ORDER BY product_name DESC`,
        [`%${req.query.product}%`])

        if (product.rows==0) {
            res.status(404)
            throw new Error('Product not found')
        } else {
            res.json(product.rows)
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}