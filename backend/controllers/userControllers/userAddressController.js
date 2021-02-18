import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'

// @desc    GET customer address
// @route   GET /api/customer/address
// @access  Private/customer

export const customerAddress = asyncHandler(async (req, res) => {

    const userDbResults = await pool.query(
        'SELECT customer_addresses.* , customers.user_id, customers.customer_id FROM customer_addresses LEFT JOIN customers ON customers.customer_id = customer_addresses.customer_id WHERE customers.user_id=$1',
        [req.user.rows[0].user_id]
    )
    if (userDbResults.rows.length == 0) {
        res.status(400)
        throw new Error('Customer address not found')
    } else {
        res.status(200).json(
            userDbResults.rows[0]
        )
    }
})


// @desc    Add customer address
// @route   POST /api/address
// @access  Private/customer
export const addCustomerAddress = asyncHandler(async (req, res) => {

    try {
        const addedAddress = await pool.query(` INSERT INTO customer_addresses
        ( name, phone_number, city, area, address, customer_id )
        VALUES($1,$2,$3,$4,$5,$6) RETURNING * `,
        [
            req.body.name,
            req.body.phone_number,
            req.body.city,
            req.body.area,
            req.body.address,
            req.customer.rows[0].customer_id
        ])

        res.status(201).json(addedAddress.rows[0])
        
    } catch (error) {
        console.error(error.message)
    }
})

