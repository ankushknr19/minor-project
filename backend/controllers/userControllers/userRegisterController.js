 import bcrypt from 'bcryptjs'
import pool from '../../database/db.js'
import { userRegisterValidateSchema } from '../../middleware/validatorMiddleware.js'
import asyncHandler from 'express-async-handler'
import jwtGenerator from '../../utils/jwtGenerator.js'


const userRegister = asyncHandler(async (req, res) => {
    const validateResult = await userRegisterValidateSchema.validateAsync(
        req.body
    )
    const searchUser = await pool.query(`SELECT * FROM users where email=$1`, [
        validateResult.email,
    ])

    const hashedPassword = await bcrypt.hashSync(validateResult.password, 10)

    if (searchUser.rows.length > 0) {
        res.status(401).send('User Already Exists')
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
            jwtToken,
        })
    } else {
        res.status(401).send('Invalid User Data')
    }
})

export { userRegister }
