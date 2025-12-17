import { Request, Response } from "express";
import prisma from "../prisma";

export default class AuthorController {
    async create(req: Request, res: Response) {
        const { name, email, bio, cpf, country } = req.body

        try {
            const emailExists = await prisma.author.findUnique({
                where: {
                    email
                }
            })

            if (emailExists) {
                return res.status(400).json({
                    message: 'Email already exists'
                })
            }

            const author = await prisma.author.create({
                data: {
                    name,
                    email,
                    bio,
                    cpf,
                    pais: country
                }
            })

            return res.status(201).json(author)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }


    async list(req: Request, res: Response) {

        try {
            const authors = await prisma.author.findMany()
            return res.status(200).json(authors)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }


    async show(req: Request, res: Response) {
        const { id } = req.params
        try {
            const author = await prisma.author.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!author) {
                return res.status(404).json({
                    message: 'No authors found'
                })
            }

            return res.status(200).json(author)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }


    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, email, bio, cpf, country } = req.body

        try {
            const author = await prisma.author.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!author) {
                return res.status(404).json({
                    message: 'No authors found'
                })
            }

            const emailExists = await prisma.author.findUnique({
                where: {
                    email
                }
            })

            if (emailExists && emailExists.email !== email) {
                return res.status(400).json({
                    message: 'Email already exists'
                })
            }

            await prisma.author.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    email,
                    bio,
                    cpf,
                    pais: country
                }
            })

            return res.status(204).send()
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }


    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            const author = await prisma.author.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!author) {
                return res.status(404).json({
                    message: 'No authors found'
                })
            }

            await prisma.author.delete({
                where: {
                    id: Number(id)
                }
            })

            return res.status(204).send()
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }
}