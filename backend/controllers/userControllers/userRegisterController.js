 import bcrypt from 'bcryptjs'
import pool from '../../database/db.js'
import { userRegisterValidateSchema } from '../../middleware/validatorMiddleware.js'
import asyncHandler from 'express-async-handler'
import jwtGenerator from '../../utils/jwtGenerator.js'


export const userRegister = asyncHandler(async (req, res) => {
    const validateResult = await userRegisterValidateSchema.validateAsync(
        req.body
    )
    const searchUser = await pool.query(`SELECT * FROM users where email=$1`, [
        validateResult.email,
    ])

    const hashedPassword = await bcrypt.hashSync(validateResult.password, 10)

    if (searchUser.rows.length > 0) {
        res.status(401)
        throw new Error('User Already Exists')
    }
    const newUser = await pool.query(
        `INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING * `,
        [
            validateResult.name,
            validateResult.email,
            hashedPassword,
        ]
    )
    const jwtToken = jwtGenerator(newUser.rows[0].user_id)
    if (newUser.rows.length > 0) {
        res.status(201).json({
            message: 'user registered successfully',
            user_id: newUser.rows[0].user_id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            is_admin: newUser.rows[0].is_admin,
            is_vendor: newUser.rows[0].is_vendor,
            jwtToken,
        })
    } else {
        res.status(401)
        throw new Error('Invalid User Data')
    }
})


export const vendorRegister = asyncHandler(async (req, res) => {
    const validateResult = await userRegisterValidateSchema.validateAsync(
        req.body
    )
    const searchUser = await pool.query(`SELECT * FROM users where email=$1`, [
        validateResult.email,
    ])

    const hashedPassword = await bcrypt.hashSync(validateResult.password, 10)

    if (searchUser.rows.length > 0) {
        res.status(401)
        throw new Error('User Already Exists')
    }
    const newUser = await pool.query(
        `INSERT INTO users(name,email,password,is_vendor) VALUES ($1,$2,$3,$4) RETURNING * `,
        [
            validateResult.name,
            validateResult.email,
            hashedPassword,
            true
        ]
    )
    const newVendor = await pool.query(
        `INSERT INTO vendors(user_id,vendor_name) VALUES ($1,$2) RETURNING * `,
        [
            newUser.rows[0].user_id,
            newUser.rows[0].name
        ]
    )
    const jwtToken = jwtGenerator(newUser.rows[0].user_id)
    if (newUser.rows.length > 0) {
        res.status(201).json({
            message: 'user registered successfully',
            user_id: newUser.rows[0].user_id,
            vendor_id: newVendor.rows[0].vendor_id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            is_admin: newUser.rows[0].is_admin,
            is_vendor: newUser.rows[0].is_vendor,
            jwtToken,
        })
    } else {
        res.status(401)
        throw new Error('Invalid User Data')
    }
})
