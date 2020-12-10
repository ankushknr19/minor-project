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
        `SELECT * FROM users WHERE user_id=$1`,
        [req.user]
    )
    const jwtToken = tokenGenerator(searchDbResults.rows[0].user_id)
    if (searchDbResults.rows.length == 0) {
        res.status(400)
        throw new Error('Unauthorized')
    } else {
        const dbResults = await pool.query(
            'UPDATE users SET name=$1,password=$2 WHERE user_id=$3 RETURNING * ',
            [
                validateResult.name,
                hashedPassword,
                req.user,
            ]
        )
        res.status(201).json({
            message: 'Successfully Updated',
            user_id: dbResults.rows[0].user_id,
            name: dbResults.rows[0].name,
            jwtToken,
        })
    }
})
