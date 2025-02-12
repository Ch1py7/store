import 'module-alias/register'
import cors from 'cors'
import express from 'express'
import { router as userRoutes } from './infrastructure/http/user-controller'
import { router as productRoutes } from './infrastructure/http/product-controller'
import { router as orderRoutes } from './infrastructure/http/order-controller'
import { router as CartRoutes } from './infrastructure/http/cart-controller'
import cookieParser from 'cookie-parser'
import { container } from './container'

const listener = container.resolve('pubSubListener')
listener.connect()

const app = express()
const port = process.env.PORT || 7777

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: ['http://localhost:5173', 'http://localhost:7777'],
		credentials: true,
	})
)
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', userRoutes)
app.use('/api/v1/', productRoutes)
app.use('/api/v1/', orderRoutes)
app.use('/api/v1/', CartRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
