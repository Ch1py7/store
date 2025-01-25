import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'module-alias/register'
import { router as userRoutes } from './infrastructure/http/user_controller'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', userRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
