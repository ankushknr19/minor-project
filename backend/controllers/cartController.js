import pool from '../database/db.js'
import asyncHandler from 'express-async-handler'

// @desc    get cart of a customer
// @route   GET /api/customer/cart
// @access  Private/customer
export const cart = asyncHandler(async (req, res) => {
    try {
        const getCart = await pool.query("SELECT carts.*, products.* FROM carts JOIN products ON carts.product_id = products.product_id WHERE customer_id=$1",[req.customer.rows[0].customer_id])   
        if (getCart.rows[0]==0) {
            res.status(404)
            throw new Error('Cart is empty')
        } else {
            res.json(getCart.rows)
        }
    } catch (error) {
        console.error(error.message)
    }
})


// @desc    Delete a cart item
// @route   DELETE /api/customer/cart/:id
// @access  Private/customer
export const deleteCartItem = asyncHandler(async (req, res) => {
    try {
        const searchDb = await pool.query("SELECT * FROM carts WHERE cart_id=$1",[req.params.id])
        if (searchDb.rows==0) {
            res.status(404)
            throw new Error('Cart item not found')
        } else {
            const deletedCartItem = await pool.query("DELETE FROM carts WHERE cart_id=$1",[req.params.id])

            res.status(201).json({ message: 'Cart item removed' })
        }
    } catch (error) {
        console.error(error.message)
    }

})



// @desc    add a cart item
// @route   POST /api/customer/cart
// @access  Private/customer
export const addCartItem = async (req, res) => {
    try {
            const newCartItem = await pool.query(` INSERT INTO carts (customer_id, product_id, qty )
            VALUES($1,$2,$3) RETURNING * `,
            [
                req.customer.rows[0].customer_id,
                req.body.product_id,
                req.body.qty
            ])
            res.status(201).json(newCartItem.rows)
    }
     catch (error) {
        console.error(error.message)
    }
}



// @desc    Update a cart item
// @route   PUT /api/customer/cart/:id
// @access  Private/customer
export const updateCartItem = asyncHandler(async (req, res) => {
    try {

        const searchDb = await pool.query("SELECT * FROM carts WHERE cart_id=$1",[req.params.id])

        if (searchDb.rows.length==0) {
            res.status(404)
            throw new Error('Cart item not found')
        } 
        else {
            
            const updatedCartItem = await pool.query("UPDATE TABLE carts SET qty=$1 WHERE cart_id=$2 ",
            [
                req.body.qty,
                req.params.id
            ])

            res.status(201).json(updatedCartItem.rows)
        }
    } catch (error) {
        console.error(error.message)
    }
})