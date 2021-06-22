import express from 'express'
import morgan from 'morgan'
import bodycookieParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import colors from 'colors'
import expressValidator from 'express-validator'

//import routes
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import { connectDB } from './utils/dbConfig.js'

//config the dotenv
dotenv.config()

//create express app
const app = express()

//database connection
connectDB()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())
app.use(expressValidator())
// app.use(cors())

//make sure the server API is running
app.get('/', (req, res) => {
  res.send('API is running...')
})

//route middlewares
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

//custom middlewares
app.use(notFound)
app.use(errorHandler)

//getting the port number
const port = process.env.PORT || 5000

//launching the server on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}...`.yellow.bold)
})
