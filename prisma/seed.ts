import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../lib/security/password";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@mutuinihospital.local";
  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  if (existingAdmin) {
    console.log("System Administrator already exists. Skipping seed.");
    return;
  }

  const passwordHash = await hashPassword("Admin@12345");

  await prisma.user.create({
    data: {
      name: "System Administrator",
      email,
      phone: "0700000000",
      passwordHash,
      role: "SYSTEM_ADMIN",
      isActive: true,
    },
  });

  console.log("System Administrator seed user created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
