import pkg from '@prisma/client';

const { PrismaClient } = pkg;

/**
 * Helps create a new instance of PrismaClient to be used across files
 */
export const prismaClient = new PrismaClient();
