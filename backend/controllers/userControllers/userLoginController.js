import pool from '../../database/db.js'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import jwtGenerator from '../../utils/jwtGenerator.js'
import { userLoginValidateSchema } from '../../middleware/validatorMiddleware.js'

const userLogin = asyncHandler(async (req, res) => {
    const validateResult = await userLoginValidateSchema.validateAsync(
        req.body
    )

    const userDbresults = await pool.query('SELECT * FROM users WHERE email=$1', [
        validateResult.email,
    ])
    if (userDbresults.rows.length == 0) {
        res.status(401).send('User Not Found')
    }
    const decryptedPassword = await bcrypt.compareSync(
        validateResult.password,
        userDbresults.rows[0].password
    )
    if (!decryptedPassword) {
        res.status(401).send('Password Does not Match')
    }
    const jwtToken = jwtGenerator(userDbresults.rows[0].user_id)
    res.status(200).json({
        message: 'Logged in',
        user_id: userDbresults.rows[0].user_id,
        name: userDbresults.rows[0].name,
        email: userDbresults.rows[0].email,
        jwtToken,
    })
})


export { userLogin } 