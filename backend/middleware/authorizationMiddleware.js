import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const verifyToken = asyncHandler(async (req, res, next) => {
  let jwtToken

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      jwtToken = req.headers.authorization.split(' ')[1]

      const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

      req.user = payload.id

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!jwtToken) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.is_admin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { verifyToken, admin }