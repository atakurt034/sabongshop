import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import path from 'path'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
dotenv.config()
connectDB()

app.use('/api/products', productRoutes)

// const __dirname = path.resolve()

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode at port ${PORT}`.yellow.bold
  )
)
