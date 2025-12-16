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

    }

    async show(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {

    }

    async delete(req: Request, res: Response) {

    }
}