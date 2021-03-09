import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'

export const userProfile = asyncHandler(async (req, res) => {

    if(req.user.rows[0].is_customer){

        const userDbResults = await pool.query(
            'SELECT users.user_id, users.email, is_vendor, is_admin, is_customer, customer_id, customers.name  FROM users JOIN customers on users.user_id = customers.user_id WHERE users.user_id=$1',
            [req.user.rows[0].user_id]
        )
        if (userDbResults.rows.length == 0) {
            res.status(400)
            throw new Error('User Not Found')
        } else {
            res.status(200).json({
                user_id: userDbResults.rows[0].user_id,
                name: userDbResults.rows[0].name,
                email: userDbResults.rows[0].email,
                customer_id: userDbResults.rows[0].customer_id,
                // is_vendor:  userDbResults.rows[0].is_vendor,
                // is_admin:  userDbResults.rows[0].is_admin,
            })
        }
    }else if(req.user.rows[0].is_vendor){
        const userDbResults = await pool.query(
            'SELECT users.user_id, users.email, is_vendor, is_admin, is_customer, vendor_id, vendor_name  FROM users JOIN vendors on users.user_id = vendors.user_id WHERE users.user_id=$1',
            [req.user.rows[0].user_id]
        )
        if (userDbResults.rows.length == 0) {
            res.status(400)
            throw new Error('User Not Found')
        } else {
            res.status(200).json({
                user_id: userDbResults.rows[0].user_id,
                name: userDbResults.rows[0].vendor_name,
                email: userDbResults.rows[0].email,
                vendor_id:  userDbResults.rows[0].vendor_id,
                // is_customer: userDbResults.rows[0].is_customer,
                // is_admin:  userDbResults.rows[0].is_admin,
            })
        }
    }else{
        console.log("admin")
    }
})
