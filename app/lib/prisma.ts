import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Forzamos la carga del archivo .env desde la raíz
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prismaClientSingleton = () => {
  console.log("DATABASE_URL en ejecución:", process.env.DATABASE_URL ? "EXISTE ✅" : "VACÍA ❌");
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;