import { PrismaClient } from '@prisma/client'

/**
 * Prisma client singleton
 * - Exporta uma instância compartilhada de `PrismaClient` para evitar abrir
 *   múltiplas conexões no pool quando o app registra handlers/rotas.
 */
const prisma = new PrismaClient()

export default prisma