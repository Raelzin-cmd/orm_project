import { Request, Response } from "express";

export default class AuthorController {
    async create(req: Request, res: Response) {
        const { name, email, bio, cpf, country } = req.body

        try {
            console.log({ name, email, bio, cpf, country })
            return res.send()
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