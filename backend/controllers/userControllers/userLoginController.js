import bcrypt from 'bcryptjs'
import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'
import jwtGenerator from '../../utils/jwtGenerator.js'
import { userLoginValidateSchema } from '../../middleware/validatorMiddleware.js'

export const userLogin = asyncHandler(async (req, res) => {
    const validateResult = await userLoginValidateSchema.validateAsync(
        req.body
    )

    const userDbResults = await pool.query('SELECT * FROM users WHERE is_vendor = false AND email=$1', [
        validateResult.email,
    ])
    if (userDbResults.rows.length == 0) {
        res.status(401)
        throw new Error ('User Not Found')
    }
    const decryptedPassword = await bcrypt.compareSync(
        validateResult.password,
        userDbResults.rows[0].password
    )
    if (!decryptedPassword) {
        res.status(401)
        throw new Error ('Password Does not Match')
    }
    const jwtToken = jwtGenerator(userDbResults.rows[0].user_id)
    res.status(200).json({
        message: 'Logged in',
        user_id: userDbResults.rows[0].user_id,
        name: userDbResults.rows[0].name,
        email: userDbResults.rows[0].email,
        is_admin: userDbResults.rows[0].is_admin,
        is_vendor: userDbResults.rows[0].is_vendor,
        jwtToken,
    })
})

export const vendorLogin = asyncHandler(async (req, res) => {
    const validateResult = await userLoginValidateSchema.validateAsync(
        req.body
    )

    const userDbResults = await pool.query('SELECT users.*, vendors.vendor_id FROM users LEFT JOIN vendors ON users.user_id = vendors.user_id WHERE is_vendor=true AND email=$1', [
        validateResult.email,
    ])
    if (userDbResults.rows.length == 0) {
        res.status(401)
        throw new Error ('Vendor Not Found')
    }
    const decryptedPassword = await bcrypt.compareSync(
        validateResult.password,
        userDbResults.rows[0].password
    )
    if (!decryptedPassword) {
        res.status(401)
        throw new Error ('Password Does not Match')
    }
    const jwtToken = jwtGenerator(userDbResults.rows[0].user_id)
        res.status(200).json({
            message: 'Vendor logged in',
            user_id: userDbResults.rows[0].user_id,
            vendor_id: userDbResults.rows[0].vendor_id,
            name: userDbResults.rows[0].name,
            email: userDbResults.rows[0].email,
            is_admin: userDbResults.rows[0].is_admin,
            is_vendor: userDbResults.rows[0].is_vendor,
            jwtToken,
        })
})