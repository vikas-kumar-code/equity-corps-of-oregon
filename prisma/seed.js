const { PrismaClient } = require("@prisma/client");
const roleSeeder = require("./seeder/roleSeeder");
const userSeeder = require("./seeder/userSeeder");
const prisma = new PrismaClient();

async function main() {
  // Start Seeding...
  roleSeeder();
  userSeeder();
  console.log("\x1b[32m",`

    Seeding completed.
  `);
  console.log("\x1b[0m");
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
