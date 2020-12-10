import jwt from 'jsonwebtoken'
import env from 'dotenv'
import asyncHandler from 'express-async-handler'

env.config()

export const verifyToken = asyncHandler(async (req, res, next) => {
    let jwtToken
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try{
           jwtToken = req.headers.authorization.split(' ')[1]
        //    console.log(jwtToken)
           const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
           req.user = payload.user;
           next();
        } catch (error) {
           console.error(error)
           res.status(403)
           throw new Error('Not Authorized, Token Failed')
        }
    }

    if (!jwtToken) {
        res.status(403)
        throw new Error('unauthorized, Token not found')
    }
})