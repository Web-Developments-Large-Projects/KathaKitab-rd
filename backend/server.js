import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import colors from 'colors'
import expressValidator from 'express-validator'

//import routes
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'

//config the dotenv
dotenv.config()

//create express app
const app = express()

//database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log(
      `MongoDB connected:  ${conn.connection.host} && ${process.env.MONGODB_URI}...`
        .cyan.underline
    )
  } catch (error) {
    console.error(
      `MongoDB connection error: ${error.message}`.red.underline.bold
    )
    process.exit(1)
  }
}

connectDB()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())
app.use(expressValidator())

//make sure the server API is running
app.get('/', (req, res) => {
  res.send('API is running...')
})

//route middlewares
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

//custom middlewares
app.use(errorHandler)

//getting the port number
const port = process.env.PORT || 5000

//launching the server on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}...`.yellow.bold)
})
