import 'dotenv/config'
import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.json('ok')
})

app.listen(process.env.PORT, () => {
    console.log('Server Started!');
})