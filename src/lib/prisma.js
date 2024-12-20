import { PrismaClient } from '@prisma/client';




const globalForPrisma = global;

/**
 * Singleton instance of PrismaClient to ensure only one instance
 * is created and used in the application, particularly in serverless
 * environments like Vercel.
 *
 * @type {PrismaClient}
 */
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
