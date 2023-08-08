const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const roleSeeder = async () => {
  await prisma.roles.createMany({
    data: [
      {
        name: "Attorney",
        status: 1,
      },
      {
        name: "Eco Provider",
        status: 1,
      },
      {
        name: "Clearing House",
        status: 1,
      },
    ],
    skipDuplicates: true,
  });
};

module.exports = roleSeeder;
