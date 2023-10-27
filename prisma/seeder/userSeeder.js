const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userSeeder = async () => {
  await prisma.users.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      first_name: "Clearing",
      last_name: "House",
      name: "Clearing House",
      password: await bcrypt.hashSync("password", 10),
      role_id: 1,
      status: 1,
      verified: 1,
    },
  });  
};

module.exports = userSeeder;
