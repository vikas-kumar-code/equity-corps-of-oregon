const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const permissionSeeder = async () => {
  const totalRoutes = await prisma.routes.count();
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE permissions`);
  let data = [];
  for (let i = 1; i <= totalRoutes; i++) {
    data.push({
      role_id: 1,
      route_id: i,
    });
  }
  for (let i = 1; i <= totalRoutes; i++) {
    data.push({
      role_id: 2,
      route_id: i,
    });
  }
  for (let i = 1; i <= totalRoutes; i++) {
    data.push({
      role_id: 3,
      route_id: i,
    });
  }
  await prisma.permissions.createMany({ data });
};

module.exports = permissionSeeder;
