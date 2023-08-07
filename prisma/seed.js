const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const defaultUserRole = await prisma.roles.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Default role",
      status: 1,
    },
  });

  const defaultUser = await prisma.users.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      name: "Demo User",
      password: await bcrypt.hashSync("password", 10),
      role_id: 1,
      status: 1,
      verified: 1,
    },
  });

  console.log({ defaultUserRole, defaultUser });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
