// Carrega variáveis de ambiente definidas em `.env` para `process.env`
import 'dotenv/config'
import express from 'express'
import routes from './routes'

// Cria a aplicação Express
const app = express()

// Middleware para fazer o parsing do body como JSON
app.use(express.json())

// Registra as rotas da aplicação (veja `src/routes.ts`)
app.use(routes)

// Inicia o servidor usando a porta definida em `process.env.PORT`.
// Nota: manter a lógica simples aqui; testes/infra podem sobrescrever `PORT`.
app.listen(process.env.PORT, () => {
        console.log('Server Started!')
})