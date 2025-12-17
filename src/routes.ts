import { Router } from 'express'
import AuthorController from './controllers/author_controller'

const routes = Router()

// Observação: aqui instanciamos `AuthorController` ao definir cada rota.
// Neste projeto os métodos do controller não dependem de `this`, então
// criar novas instâncias por rota funciona sem problemas. Se futuramente
// o controller mantiver estado, considere instanciar uma vez e reutilizar:
// const authorController = new AuthorController()

routes.post('/authors', new AuthorController().create)
routes.get('/authors', new AuthorController().list)
routes.get('/authors/:id', new AuthorController().show)
routes.put('/authors/:id', new AuthorController().update)
routes.delete('/authors/:id', new AuthorController().delete)

export default routes