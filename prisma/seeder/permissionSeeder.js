const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const permissionSeeder = async () => {
  
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
    "/admin/dashboard",
    "/admin/case-invitations",
    "/api/admin/cases/invitations",
    "/api/admin/cases/invitations/accept",
    "/api/admin/cases/invitations/get",    
    "/admin/settings",
    "/api/admin/settings",
    "/api/admin/settings/delete",
    "/api/admin/settings/save",
    "/api/admin/settings/update-profile",
    "/api/admin/settings/change-password",
    "/api/admin/download"
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
