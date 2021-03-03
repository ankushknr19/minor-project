import pool from '../../database/db.js'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { userUpdateValidateSchema } from '../../middleware/validatorMiddleware.js'
import jwtGenerator from '../../utils/jwtGenerator.js'

// @description update profile for users
// @route  PUT/api/users/profile
// @access private route

 export const userProfileUpdate = asyncHandler(async (req, res) => {
    const validateResult = await userUpdateValidateSchema.validateAsync(
        req.body
    )
    const hashedPassword = bcrypt.hashSync(validateResult.password, 10)
    const searchDbResults = await pool.query(
        `SELECT email FROM users WHERE user_id=$1`,
        [req.user.rows[0].user_id]
    )
    
    if (searchDbResults.rows[0].length == 0) {
        res.status(404)
        throw new Error('User not found')
    } else {
        const dbResults = await pool.query(
            `UPDATE users SET password=$1 WHERE user_id=$2 RETURNING * `,
            [
                hashedPassword,
                req.user.rows[0].user_id,
            ]
        )
        if(req.user.rows[0].is_customer){

            const updateCustomer = await pool.query(
                `UPDATE customers SET name=$1 WHERE user_id=$2 RETURNING * `,
                [
                    validateResult.name,
                    req.user.rows[0].user_id,
                ]
            )
            res.status(201).json({
                message: 'Successfully Updated',
                user_id: dbResults.rows[0].user_id,
                name: updateCustomer.rows[0].name,
                jwtToken: jwtGenerator(searchDbResults.rows[0].user_id),
            })
        }else{
            const updateVendor = await pool.query(
                `UPDATE customers SET vendor_name=$1 WHERE user_id=$2 RETURNING * `,
                [
                    validateResult.name,
                    req.user.rows[0].user_id,
                ]
            )
            res.status(201).json({
                message: 'Successfully Updated',
                user_id: dbResults.rows[0].user_id,
                name: updateVendor.rows[0].name,
                jwtToken: jwtGenerator(searchDbResults.rows[0].user_id),
            })
        }
    }
})
