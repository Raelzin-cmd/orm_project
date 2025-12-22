/*
 * Category Controller
 * - Responsável por criar categorias em massa a partir de uma lista de nomes.
 * - Recebe no body `{ names: string[] }` e cria registros via Prisma.
 * - Retorna 201 com o resultado do `createMany` ou 400 em caso de erro.
 */
import { Request, Response } from "express";
import prisma from "../prisma";

export default class CategoryController {
    /**
     * Cria múltiplas categorias de uma vez.
     * @param req Espera `req.body.names: string[]`.
     * @param res Retorna 201 com o resultado ou 400 com erro.
     */
    async create(req: Request, res: Response) {
        const { names } = req.body as { names: string[] }

        try {
            const dataNames = names.map(name => ({ name }))

            const category = await prisma.category.createMany({
                data: dataNames
            })

            return res.status(201).json(category)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({
                message: erro.message
            })
        }
    }
}

