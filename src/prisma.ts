import { PrismaClient } from '@prisma/client'

// Exporta uma única instância do PrismaClient para toda a aplicação.
// Ter uma instância compartilhada evita criação excessiva de conexões
// com o banco e funciona bem em apps Express simples.
const prisma = new PrismaClient()

export default prisma