import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import vendors from './data/vendors.js'
import productRoutes from './routes/productRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/vendors', vendorRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
