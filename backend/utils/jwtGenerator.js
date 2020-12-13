import jwt from 'jsonwebtoken'

const jwtGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  })
}

export default jwtGenerator

// import jwt from 'jsonwebtoken'
// import env from 'dotenv'

// env.config();

// const jwtGenerator = (id) => {
//    const payload = {
//       user: id,
//    };

//    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
// }

// export default jwtGenerator;
