import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "jahidulalam.personal@gmail.com";
  const plainPassword = "changeme123"; // ⚠️ change this after first login

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Md. Jahidul Alam",
      passwordHash,
      role: "OWNER",
    },
  });

  console.log(`✅ Seeded admin user: ${user.email}`);
  console.log(`   Login with password: ${plainPassword}`);
  console.log(`   ⚠️  Change this password after your first login.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });