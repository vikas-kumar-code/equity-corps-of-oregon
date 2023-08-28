const { PrismaClient } = require("@prisma/client");
import prisma from "@/utils/prisma";

const permissionSeeder = async () => {
  const totalRoutes = await prisma.routes.count();
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE permissions`);
  let data = [];

  // Clearing houe permissions
  // No need to assign permissions to clearing house
  // Already by passed in middleware

  // Attorney permissions
  // for (let i = 1; i <= totalRoutes; i++) {
  //   data.push({
  //     role_id: 2,
  //     route_id: i,
  //   });
  // }

  // Eco provider permissions
  const ecoProviderPermissions = [
    "admin/dashboard",
    "admin/case-invitations",
    "api/admin/cases/invitations",
    "api/admin/cases/invitations/accept",
    "api/admin/cases/invitations/status",
  ];
  const ecoRoutes = await prisma.routes.findMany({
    where: {
      url: {
        in: ecoProviderPermissions,
      },
    },
  });
  ecoRoutes.forEach((item) => {
    data.push({
      role_id: 3,
      route_id: item.id,
    });
  });

  await prisma.permissions.createMany({ data });
};

module.exports = permissionSeeder;
