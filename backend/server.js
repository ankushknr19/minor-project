import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/vendors', vendorRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
