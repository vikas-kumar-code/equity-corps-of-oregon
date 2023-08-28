const { PrismaClient } = require("@prisma/client");
import prisma from "@/utils/prisma";

const roleSeeder = async () => {

  await prisma.roles.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Clearing House", // Super Admin
      status: 1,
    },
  });

  await prisma.roles.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Attorney", // Registered user
      status: 1,
    },
  });

  await prisma.roles.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Eco Provider", // Created by registered Attorney
      status: 1,
    },
  });

};

module.exports = roleSeeder;
