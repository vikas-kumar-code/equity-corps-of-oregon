const { PrismaClient } = require("@prisma/client");
const roleSeeder = require("./seeder/roleSeeder");
const userSeeder = require("./seeder/userSeeder");
const routeSeeder = require("./seeder/routeSeeder");
const permissionSeeder = require("./seeder/permissionSeeder");
const questionSeeder = require("./seeder/questionSeeder");
const emailTemplateSeeder = require("./seeder/emailTemplateSeeder");
const invoiceCategoriesSeeder = require("./seeder/invoiceCategoriesSeeder");
const prisma = new PrismaClient();

async function main() {
  // Start Seeding...
  await roleSeeder();
  // await userSeeder();
  await routeSeeder();
  await permissionSeeder();
  await questionSeeder();
  // await emailTemplateSeeder();
  await invoiceCategoriesSeeder();
  console.log(
    "\x1b[32m",
    `

    Seeding completed.
  `
  );
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
