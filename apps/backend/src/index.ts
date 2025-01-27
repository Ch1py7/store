import 'module-alias/register'
import cors from 'cors'
import express from 'express'
import { router as userRoutes } from './infrastructure/http/user_controller'

const app = express()
const port = 7777

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', userRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
