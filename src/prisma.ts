import { PrismaClient } from '@prisma/client'

// Instancia o PrismaClient sem opções (comportamento padrão usado em aulas)
const prisma = new PrismaClient()

export default prisma