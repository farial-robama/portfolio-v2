import { PrismaClient } from "@prisma/client";

/**
 * Next.js hot-reloads modules on every file save in dev. Without this
 * guard, that would create a brand-new PrismaClient — and a brand-new
 * pool of DB connections — on every save, until you exhaust your
 * database's connection limit.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}