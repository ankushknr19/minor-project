import pool from '../../database/db.js'
import asyncHandler from 'express-async-handler'

export const userProfile = asyncHandler(async (req, res) => {
    console.log(req.user)
    console.log(req.user.rows[0].user_id)
    const userDbResults = await pool.query(
        'SELECT * FROM users WHERE user_id=$1',
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
            is_vendor:  userDbResults.rows[0].is_vendor,
            is_admin:  userDbResults.rows[0].is_admin,
        })
    }
})
