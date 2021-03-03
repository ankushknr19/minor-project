import pool from '../database/db.js'
import env from 'dotenv'
import axios from 'axios'
import asyncHandler from 'express-async-handler'


env.config()

// @desc    payment verification and create new payment in payments table
// @route   POST /api/orders/payment
// @access  Private/customer

const createPayment = asyncHandler(async (req, res) => {
        const data = {
            token: req.body.token,
            amount: req.body.amount,
        }
        const config = {
            headers: {
                Authorization: `key ${process.env.KHALTI_TEST_SECRET_KEY}`,
            },
        }
        await axios
            .post('https://khalti.com/api/v2/payment/verify/', data, config)
            .then((response) => {
                console.log(response.data)
                if (response.data.state.name == 'Completed') {
                    pool.query(`INSERT INTO payments (payment_id,status,update_time,amount,token,customer_id,payment_type,payment_gateway) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `,
                        [
                            response.data.idx,
                            response.data.state.name,
                            response.data.created_on,
                            response.data.amount / 100,
                            response.data.token,
                            req.customer.rows[0].customer_id,
                            response.data.type.name,
                            response.data.user.name,
                        ]
                    )
                } else {
                    res.status(400)
                    throw new Error('payment Error')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    })

export default createPayment