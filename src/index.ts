import 'dotenv/config'
import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json())

app.use(routes)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})