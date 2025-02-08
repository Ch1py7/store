import cors from 'cors'
import express from 'express'
import 'module-alias/register'
import { router as authRoutes } from './infrastructure/http/auth_controller'
import cookieParser from 'cookie-parser'

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

app.use('/api/v1/', authRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
