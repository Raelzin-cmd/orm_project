import { Request, Response } from 'express'
import prisma from '../prisma'

// Controller responsável por operações CRUD de `Author`.
// Observações importantes para outro desenvolvedor:
// - Usamos o `prisma` importado de `src/prisma.ts` (instância única).
// - O nome do campo no banco é `pais`, mas na API usamos `country` para
//   ficar mais claro/idiomático; o mapeamento é feito nas operações abaixo.
// - Erros são capturados e retornam status 400 com a mensagem do erro.
export default class AuthorController {
    // Cria um novo autor. Valida unicidade do email antes de criar.
    async create(req: Request, res: Response) {
        const { name, email, bio, cpf, country, profileDescription } = req.body

        try {
            // Verifica se já existe autor com o mesmo email
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

            const profile = !profileDescription ? undefined : {
                description: profileDescription
            }

            // Cria o autor. Observe o mapeamento: `pais: country`
            const author = await prisma.author.create({
                data: {
                    name,
                    email,
                    bio,
                    cpf,
                    pais: country,
                    ...(profile ? { profile: { create: profile } } : {})
                }
            })

            return res.status(201).json(author)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }

    async createProfile(req: Request, res: Response) {
        const { description } = req.body
        const { id } = req.params

        try {
            // Verifica se já existe autor com o mesmo email
            const author = await prisma.author.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!author) {
                return res.status(404).json({
                    message: 'Author not found'
                })
            }

            // Cria o autor. Observe o mapeamento: `pais: country`
            const profile = await prisma.profile.create({
                data: {
                    description,
                    authorId: author.id
                }
            })

            return res.status(201).json(profile)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }

    // Lista todos os autores
    async list(req: Request, res: Response) {
        try {
            const authors = await prisma.author.findMany()
            return res.status(200).json(authors)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }

    // Retorna um autor por `id`
    async show(req: Request, res: Response) {
        const { id } = req.params
        try {
            const author = await prisma.author.findUnique({ where: { id: Number(id) } })

            if (!author) {
                return res.status(404).json({ message: 'No authors found' })
            }

            return res.status(200).json(author)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }

    // Atualiza um autor existente; valida conflitos de email
    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, email, bio, cpf, country } = req.body

        try {
            const author = await prisma.author.findUnique({ where: { id: Number(id) } })

            if (!author) {
                return res.status(404).json({ message: 'No authors found' })
            }

            // Verifica se o novo email está em uso por outro registro
            const emailExists = await prisma.author.findUnique({ where: { email } })

            if (emailExists && emailExists.email !== email) {
                return res.status(400).json({ message: 'Email already exists' })
            }

            await prisma.author.update({
                where: { id: Number(id) },
                data: { name, email, bio, cpf, pais: country }
            })

            // 204: sucesso sem conteúdo (recurso atualizado)
            return res.status(204).send()
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }

    // Remove um autor por `id`
    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            const author = await prisma.author.findUnique({ where: { id: Number(id) } })

            if (!author) {
                return res.status(404).json({ message: 'No authors found' })
            }

            await prisma.author.delete({ where: { id: Number(id) } })

            return res.status(204).send()
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({ message: erro.message })
        }
    }
}