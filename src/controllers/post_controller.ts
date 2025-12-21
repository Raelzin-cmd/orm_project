import { Request, Response } from "express";
import prisma from "../prisma";

type PostBody = {
    title: string
    content: string
    authorId: number
    categories: string[]
}

export default class PostController {
    async create(req: Request, res: Response) {
        const { title, content, authorId, categories } = req.body

        try {
            const author = await prisma.author.findUnique({
                where: {
                    id: authorId
                }
            })

            if (!author) {
                return res.status(404).json({
                    message: 'Author not found'
                })
            }

            const categoriesExists = await prisma.category.findMany({
                where: {
                    id: { in: categories }
                }
            })

            if (categories.length !== categoriesExists.length) {
                return res.status(404).json({
                    message: 'Some category infoned does not exist'
                })
            }

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: author.id,
                    postCategories: {
                        create: categoriesExists.map(categories => {
                            return {
                                categoryId: categories.id
                            }
                        })
                    }
                }
            })

            return res.status(201).json(post)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: true,
                    postCategories: {
                        include: {
                            category: true
                        }
                    }
                }
            })

            return res.status(200).json(posts)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }
}

