const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const userSeeder = async () => {
  await prisma.users.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      first_name: "Clearing",
      last_name: "House",
      password: await bcrypt.hashSync("password", 10),
      role_id: 1,
      status: 1,
      verified: 1,
    },
  });

  await prisma.users.upsert({
    where: { email: "attorney@gmail.com" },
    update: {},
    create: {
      email: "attorney@gmail.com",
      first_name: "Attorney",
      password: await bcrypt.hashSync("password", 10),
      role_id: 2,
      status: 1,
      verified: 1,
    },
  });

  await prisma.users.upsert({
    where: { email: "ecoprovider@gmail.com" },
    update: {},
    create: {
      email: "ecoprovider@gmail.com",
      first_name: "Eco Provider",
      password: await bcrypt.hashSync("password", 10),
      role_id: 3,
      status: 1,
      verified: 1,
    },
  });

  // Eco Provider
  await prisma.users.upsert({
    where: { email: "vishal@gmail.com" },
    update: {},
    create: {
      email: "vishal@gmail.com",
      first_name: "Vishal",
      password: await bcrypt.hashSync("password", 10),
      role_id: 3,
      status: 1,
      verified: 1,
    },
  });

  // Eco Provider
  await prisma.users.upsert({
    where: { email: "vikas@gmail.com" },
    update: {},
    create: {
      email: "vikas@gmail.com",
      first_name: "Vikas",
      password: await bcrypt.hashSync("password", 10),
      role_id: 3,
      status: 1,
      verified: 1,
    },
  });
};

module.exports = userSeeder;
