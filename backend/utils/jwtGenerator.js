import jwt from 'jsonwebtoken'

const jwtGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  })
}

export default jwtGenerator

