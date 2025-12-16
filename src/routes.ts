import { Router } from 'express'
import AuthorController from './controllers/author_controller'

const routes = Router()
const authorController = new AuthorController()

routes.post('/authors', authorController.create.bind(authorController))

export default routes