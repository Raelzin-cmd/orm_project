/*
 * Route definitions
 * - Centraliza registro de rotas HTTP e associa cada rota ao método do controller.
 * - Observação: os controllers são instanciados diretamente por rota; isso é
 *   aceitável enquanto os controllers forem stateless. Caso um controller
 *   precise manter estado, instancie-o uma vez e reuse a instância.
 */
import { Router } from 'express'
import AuthorController from './controllers/author_controller'
import CategoryController from './controllers/category_controller'
import PostController from './controllers/post_controller'

const routes = Router()

// Rotas de autores
routes.post('/authors', new AuthorController().create)
routes.get('/authors', new AuthorController().list)
routes.get('/authors/:id', new AuthorController().show)
routes.put('/authors/:id', new AuthorController().update)
routes.delete('/authors/:id', new AuthorController().delete)
routes.post('/authors/:id/profile', new AuthorController().createProfile)

// Rotas de categorias e posts
routes.post('/categories', new CategoryController().create)
routes.post('/posts', new PostController().create)
routes.get('/posts', new PostController().list)

export default routes