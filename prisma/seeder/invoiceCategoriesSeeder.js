const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const invoiceCategoriesSeeder = async () => {
  await prisma.invoice_categories.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Research",
    },
  });
  await prisma.invoice_categories.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Preparation",
    },
  });
  await prisma.invoice_categories.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Appointments",
    },
  });
  await prisma.invoice_categories.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Interview/Hearing",
    },
  });
  await prisma.invoice_categories.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: " Drafting/Writing",
    },
  });
  await prisma.invoice_categories.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Other - Describe",
    },
  });
};

module.exports = invoiceCategoriesSeeder;
