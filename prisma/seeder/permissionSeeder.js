const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const permissionSeeder = async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE permissions`);
  let data = [];

  // Clearing houe permissions
  // No need to assign permissions to clearing house
  // Already by passed in middleware

  // Eco provider permissions
  const ecoProviderPermissions = [
    "/admin/dashboard",
    "/admin/case-invitations",
    "/api/admin/cases/invitation",
    "/api/admin/cases/invitation/accept",
    "/api/admin/cases/invitation/get/:id",
    "/admin/settings",
    "/api/admin/settings",
    "/api/admin/settings/delete/:id",
    "/api/admin/settings/save",
    "/api/admin/settings/save/:id",
    "/api/admin/settings/update-profile",
    "/api/admin/settings/change-password",
    "/api/admin/download/@path",
    "/api/admin/modules",    
    "/api/admin/cases/invoice/save",
    "/api/admin/cases/invoice/save/:id",
    "/api/admin/cases/invoice/list/:id",
    "/api/admin/cases/invoice/get/:id",
    "/api/admin/cases/invoice/delete/:id",
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
