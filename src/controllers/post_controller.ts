/*
 * Post Controller
 * - Gerencia criação e listagem de posts.
 * - Ao criar, valida se o `authorId` existe e vincula categorias existentes.
 */
import { Request, Response } from "express";
import prisma from "../prisma";

/**
 * Tipo esperado no body ao criar um post.
 */
type PostBody = {
    title: string
    content: string
    authorId: number
    categories: string[]
}

export default class PostController {
    /**
     * Cria um post relacionado a um autor e associa categorias.
     * - Verifica existência do autor.
     * - Aceita `categories` como array de ids (strings) para associação.
     */
    async create(req: Request, res: Response) {
        const { title, content, authorId, categories } = req.body as PostBody

        try {
            const author = await prisma.author.findUnique({ where: { id: authorId } })

            if (!author) {
                return res.status(404).json({ message: 'Author not found' })
            }

            const categoriesExists = await prisma.category.findMany({ where: { id: { in: categories } } })

            if (categories.length !== categoriesExists.length) {
                return res.status(404).json({ message: 'Some category informed does not exist' })
            }

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: author.id,
                    postCategories: {
                        create: categoriesExists.map(c => ({ categoryId: c.id }))
                    }
                }
            })

            return res.status(201).json(post)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }

    /**
     * Lista posts incluindo autor e categorias relacionadas.
     */
    async list(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: true,
                    postCategories: { include: { category: true } }
                }
            })

            return res.status(200).json(posts)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }
}

