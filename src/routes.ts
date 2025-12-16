import { Router } from 'express'
import AuthorController from './controllers/author_controller'

const routes = Router()

routes.post('/authors', new AuthorController().create)

export default routes