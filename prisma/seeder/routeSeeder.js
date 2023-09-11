const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const routeSeeder = async () => {
  const records = [
    {
      label: "Dashboard",
      icon: "mdi mdi-view-dashboard",
      url: "/admin/dashboard",
    },
    {
      label: "Cases",
      icon: "mdi mdi-alpha-c-circle",
      url: "/admin/cases",
      children: {
        create: [
          { label: "Api", url: "/api/admin/cases" },
          { label: "Api", url: "/api/admin/cases/get" },
          { label: "Api", url: "/api/admin/cases/save" },
          { label: "Api", url: "/api/admin/cases/delete" },
          { label: "Api", url: "/api/admin/cases/invitation/send" },
        ],
      },
    },
    {
      label: "Case Invitations",
      icon: "mdi mdi-calendar",
      url: "/admin/case-invitations",
      children: {
        create: [
          { label: "Api", url: "/api/admin/cases/invitation" },
          { label: "Api", url: "/api/admin/cases/invitation/accept" },
          { label: "Api", url: "/api/admin/cases/invitation/get" },
        ],
      },
    },
    {
      label: "Questions",
      icon: "mdi mdi-help-circle",
      url: "/admin/questions",
      children: {
        create: [
          { label: "Api", url: "/api/admin/questions" },
          { label: "Api", url: "/api/admin/questions/delete" },
          { label: "Api", url: "/api/admin/questions/get" },
          { label: "Api", url: "/api/admin/questions/save" },
        ],
      },
    },
    {
      label: "Users",
      icon: "mdi mdi-account",
      url: "/admin/users",
      children: {
        create: [
          { label: "Api", url: "/api/admin/users" },
          { label: "Api", url: "/api/admin/users/delete" },
          { label: "Api", url: "/api/admin/users/save" },
          { label: "Api", url: "/api/admin/users/search" },
        ],
      },
    },
    {
      label: "Email templates",
      icon: "mdi mdi-email-multiple-outline",
      url: "/admin/email-templates",
      children: {
        create: [
          { label: "Api", url: "/api/admin/email-templates" },
          { label: "Api", url: "/api/admin/email-templates/delete" },
          { label: "Api", url: "/api/admin/email-templates/get" },
          { label: "Api", url: "/api/admin/email-templates/save" },
        ],
      },
    },
    {
      label: "Roles",
      icon: "mdi mdi-account-group",
      url: "/admin/roles",
      children: {
        create: [
          { label: "Api", url: "/api/admin/roles" },
          { label: "Api", url: "/api/admin/roles/delete" },
          { label: "Api", url: "/api/admin/roles/save" },
        ],
      },
    },
    {
      label: "Settings",
      icon: "mdi mdi-tune-vertical",
      url: "/admin/settings",
      children: {
        create: [
          { label: "Api", url: "/api/admin/settings" },
          { label: "Api", url: "/api/admin/settings/delete" },
          { label: "Api", url: "/api/admin/settings/save" },
          { label: "Api", url: "/api/admin/settings/update-profile" },
          { label: "Api", url: "/api/admin/settings/change-password" },
        ],
      },
    },
    {
      label: "Api",
      url: "/api/admin/download",
    },
  ];

  // Truncate routes table
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE routes`);
  await processRecords(records);
};

// Assume you have your Prisma setup and the 'records' array defined

async function processRecords(records) {
  if (records.length === 0) {
    console.log("All records processed.");
    return;
  }

  const data = records.shift(); // Get the first record and remove it from the array
  console.log(`Processing record: ${JSON.stringify(data)}`);

  // Simulate waiting for a reaction (you can replace this with actual logic)
  await waitForReaction();

  // Call the Prisma create function
  await prisma.routes.create({
    data,
  });

  // Recursively call the function for the next record
  await processRecords(records);
}

async function waitForReaction() {
  return new Promise((resolve) => {
    // Simulate waiting for a reaction, e.g., wait for user input
    setTimeout(() => {
      resolve();
    }, 1000); // Change the timeout as needed
  });
}

module.exports = routeSeeder;
