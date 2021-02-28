import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'

// @desc    GET customer address
// @route   GET /api/customer/address
// @access  Private/customer

export const customerAddress = asyncHandler(async (req, res) => {

    const userDbResults = await pool.query(
        'SELECT * FROM customer_addresses WHERE customer_id=$1',
        [req.customer.rows[0].customer_id]
    )
        res.status(200).json( userDbResults.rows[0] )
})


// @desc    Add customer default shipping addresses
// @route   POST /api/address
// @access  Private/customer
export const addCustomerAddress = asyncHandler(async (req, res) => {

    try {

        const searchDb = await pool.query("SELECT * FROM customer_addresses WHERE customer_id=$1",
        [
            req.customer.rows[0].customer_id
        ])

        if (searchDb.rows.length==0) {
            const addedDefaultAddress = await pool.query(` INSERT INTO customer_addresses
        (customer_id, name, phone_number, city, area, address, is_default)
        VALUES($1,$2,$3,$4,$5,$6, $7) RETURNING * `,
        [
            req.customer.rows[0].customer_id,
            req.body.name,
            req.body.phone_number,
            req.body.city,
            req.body.area,
            req.body.address,
            true
        ])
        res.status(201).json(addedDefaultAddress.rows[0])
        }
        else {
            res.status(404)
            throw new Error('Customer has address already')
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
})


// @desc    Update address
// @route   PUT /api/customer/address
// @access  Private/customer
export const updateCustomerAddress = asyncHandler(async (req, res) => {
    try {

        const searchDb = await pool.query("SELECT * FROM customer_addresses WHERE customer_id=$1",
        [
            req.customer.rows[0].customer_id
        ])

        if (searchDb.rows[0].length==0) {
            res.status(404)
            throw new Error('Address not found')
        } else {

            const updatedAddress = await pool.query(`UPDATE customer_addresses SET name=$1, phone_number=$2, city=$3, area=$4, address=$5 WHERE customer_id=$6 RETURNING *`,
            [
                req.body.name,
                req.body.phone_number,
                req.body.city,
                req.body.area,
                req.body.address,
                req.customer.rows[0].customer_id
            ])
            res.status(201).json(updatedAddress.rows[0])
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
})


// @desc    Delete customer address
// @route   DELETE /api/customer/address
// @access  Private/customer
export const deleteCustomerAddress = asyncHandler(async (req, res) => {
    try {
        const searchDB = await pool.query("SELECT * FROM customer_addresses WHERE customer_id=$1",
        [
            req.customer.rows[0].customer_id
        ])
        if (searchDB.rows[0]==0) {
            res.status(404)
            throw new Error('Address not found')
        } else {
                const deletedAddress = await pool.query("DELETE FROM customer_addresses WHERE customer_id=$1",
                [
                    req.customer.rows[0].customer_id
                ])
                res.status(201).json({ message: 'Address deleted' })
            
        }
    } catch (error) {
        res.status(404).json(error.message)
    }

})