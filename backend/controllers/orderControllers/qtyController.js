import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'

//decrease the count_in_stock of a product after successfully placed order

// @desc    Update a cart item
// @route   PATCH /api/products/:id
// @access  Private/customer
export const updateCountInStock = asyncHandler(async (req, res) => {
    try {

        const searchDb = await pool.query("SELECT * FROM products WHERE product_id=$1",[req.params.id])

        if (searchDb.rows.length==0) {
            res.status(500)
            throw new Error('Product not found')
        } 
        else {
            
            const updatedCountInStock = await pool.query(`UPDATE products SET count_in_stock=count_in_stock-$1 WHERE product_id=$2 RETURNING *`,
            [
                req.body.qty,
                req.params.id
            ])

            res.status(201).json(updatedCountInStock.rows[0])
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
})