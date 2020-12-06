import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config();

const jwtGenerator(user_id) => {
   const payload = {
      user: user_id,
   };

   return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
}

export default jwtGenerator;
