const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const routeSeeder = async () => {
  const records = [
    {      
      label: "Dashboard",
      icon: "mdi mdi-view-dashboard",
      url: "/admin/dashboard", 
      method: "get",     
    },
    {
      label: "Cases",
      icon: "mdi mdi-alpha-c-circle",
      url: "/admin/cases",
      method: "get",
      children: {
        create: [
          { label: "Api", url: "/api/admin/cases", method: "get"},
          { label: "Api", url: "/api/admin/cases/get/:id", method: "get"},
          { label: "Api", url: "/api/admin/cases/save", method: "post" },          
          { label: "Api", url: "/api/admin/cases/save/:id", method: 'put'},
          { label: "Api", url: "/api/admin/cases/delete/:id", method: 'delete' },
          { label: "Api", url: "/api/admin/cases/invitation", method: "get" },
          { label: "Api", url: "/api/admin/cases/invitation/send", method: 'post' }, 
          { label: "Api", url: "/api/admin/cases/invitation/accept", method: "post" },
          { label: "Api", url: "/api/admin/cases/invitation/get/:id", method: "get" },
          { label: "Api", url: "/api/admin/cases/invoice", method: 'post' },
          { label: "Api", url: "/api/admin/cases/invoice/save", method: 'post' },
          { label: "Api", url: "/api/admin/cases/invoice/save/:id", method: 'put' },
          { label: "Api", url: "/api/admin/cases/invoice/list/:id", method: 'get' },
          { label: "Api", url: "/api/admin/cases/invoice/get/:id", method: 'get' },
          { label: "Api", url: "/api/admin/cases/invoice/delete/:id", method: 'delete' },         
        ],
      },
    },
    {
      label: "Case Invitations",
      icon: "mdi mdi-calendar",
      url: "/admin/case-invitations",
      method: "get",
    },
    {
      label: "Questions",
      icon: "mdi mdi-help-circle",
      url: "/admin/questions",
      method: "get",
      children: {
        create: [
          { label: "Api", url: "/api/admin/questions", method: "get" },
          { label: "Api", url: "/api/admin/questions/delete/:id", method: "delete" },
          { label: "Api", url: "/api/admin/questions/get/:id", method: "get" },
          { label: "Api", url: "/api/admin/questions/save",  method: "post"},
          { label: "Api", url: "/api/admin/questions/save/:id", method: "put" },
        ],
      },
    },
    {
      label: "Users",
      icon: "mdi mdi-account",
      url: "/admin/users",
      method: "get",
      children: {
        create: [
          { label: "Api", url: "/api/admin/users", method: "get" },
          { label: "Api", url: "/api/admin/users/delete/:id", method: "delete" },
          { label: "Api", url: "/api/admin/users/save",  method: "post"},
          { label: "Api", url: "/api/admin/users/save/:id", method: "put" },
          { label: "Api", url: "/api/admin/users/search", method: "get" },
        ],
      },
    },
    {
      label: "Email templates",
      icon: "mdi mdi-email-multiple-outline",
      url: "/admin/email-templates",
      method: "get",
      children: {
        create: [
          { label: "Api", url: "/api/admin/email-templates", method: "get" },
          { label: "Api", url: "/api/admin/email-templates/delete/:id", method: "delete" },
          { label: "Api", url: "/api/admin/email-templates/get/:id", method: "get" },
          { label: "Api", url: "/api/admin/email-templates/save",  method: "post"},
          { label: "Api", url: "/api/admin/email-templates/save/:id", method: "put" },
        ],
      },
    },
    {
      label: "Roles",
      icon: "mdi mdi-account-group",
      url: "/admin/roles",
      method: "get",
      children: {
        create: [
          { label: "Api", url: "/api/admin/roles", method: "get" },
          { label: "Api", url: "/api/admin/roles/delete/:id", method: "delete" },
          { label: "Api", url: "/api/admin/roles/save",  method: "post"},
          { label: "Api", url: "/api/admin/roles/save/:id", method: "put" },
        ],
      },
    },
    {
      label: "Settings",
      icon: "mdi mdi-tune-vertical",
      url: "/admin/settings",
      method: "get",
      children: {
        create: [
          { label: "Api", url: "/api/admin/settings", method: "get" },
          { label: "Api", url: "/api/admin/settings/delete/:id", method: "delete" },
          { label: "Api", url: "/api/admin/settings/save",  method: "post"},
          { label: "Api", url: "/api/admin/settings/save/:id", method: "put" },
          { label: "Api", url: "/api/admin/settings/update-profile", method: "get|put" },
          { label: "Api", url: "/api/admin/settings/change-password", method: "put" },
        ],
      },
    },
    {
      label: "Api",
      url: "/api/admin/download/@path",
      method: "get",
    },
    {
      label: "Api",
      url: "/api/admin/modules",
      method: "get",
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
