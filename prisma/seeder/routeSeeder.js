const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const routeSeeder = async () => {
  const records = [
    {      
      label: "Dashboard",
      icon: "mdi mdi-view-dashboard",
      url: "/admin/dashboard", 
      method: "get",
      children: {
        create: [
          { label: "Dashboard Details", url: "/api/admin/dashboard", method: "get"},
        ],
      },     
    },
    {
      label: "Cases",
      icon: "mdi mdi-alpha-c-circle",
      url: "/admin/cases",
      method: "get",
      children: {
        create: [
          { label: "Get Cases", url: "/api/admin/cases", method: "get"},
          { label: "Get Case", url: "/api/admin/cases/get/:id", method: "get"},
          { label: "Add Case", url: "/api/admin/cases/save", method: "post" },          
          { label: "Update Case", url: "/api/admin/cases/save/:id", method: 'put'},
          { label: "Delete Case", url: "/api/admin/cases/delete/:id", method: 'delete' },
          { label: "Get Case-Invitations", url: "/api/admin/cases/invitation", method: "get" },
          { label: "Send Invitation", url: "/api/admin/cases/invitation/send", method: 'post' }, 
          { label: "Accept Invitation", url: "/api/admin/cases/invitation/accept", method: "post" },
          { label: "Get Case-Invitation", url: "/api/admin/cases/invitation/get/:id", method: "get" },
          { label: "Get Invoices", url: "/api/admin/cases/invoice", method: 'get' },
          { label: "Add Invoice", url: "/api/admin/cases/invoice/save", method: 'post' },
          { label: "Update Invoice", url: "/api/admin/cases/invoice/save/:id", method: 'put' },
          { label: "Get Invoice List", url: "/api/admin/cases/invoice/list/:id", method: 'get' },
          { label: "Get Invoice", url: "/api/admin/cases/invoice/get/:id", method: 'get' },
          { label: "Delete Invoice", url: "/api/admin/cases/invoice/delete/:id", method: 'delete' },
          { label: "Send invoice for approval", url: "/api/admin/cases/invoice/send/:id", method: 'post' },
          { label: "Upload Files", url: "/api/admin/cases/invitation/document/upload", method: 'post' },
          { label: "Delete eco provider file", url: "/api/admin/cases/invitation/document/delete/:id", method: 'delete' },
          { label: "Case invoice categories", url: "/api/admin/cases/invoice/categories", method: 'get' },
        ],
      },
    },
    {
      label: "Cases",
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
          { label: "Get Questions", url: "/api/admin/questions", method: "get" },
          { label: "Delete Question", url: "/api/admin/questions/delete/:id", method: "delete" },
          { label: "Get Question", url: "/api/admin/questions/get/:id", method: "get" },
          { label: "Add Question", url: "/api/admin/questions/save",  method: "post"},
          { label: "Update Question", url: "/api/admin/questions/save/:id", method: "put" },
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
          { label: "Get Users", url: "/api/admin/users", method: "get" },
          { label: "Delete User", url: "/api/admin/users/delete/:id", method: "delete" },
          { label: "Add User", url: "/api/admin/users/save",  method: "post"},
          { label: "Update User", url: "/api/admin/users/save/:id", method: "put" },
          { label: "Search User", url: "/api/admin/users/search", method: "get" },
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
          { label: "Get Email Templates", url: "/api/admin/email-templates", method: "get" },
          { label: "Delete Email Template", url: "/api/admin/email-templates/delete/:id", method: "delete" },
          { label: "Get Email Template", url: "/api/admin/email-templates/get/:id", method: "get" },
          { label: "Add Email Template", url: "/api/admin/email-templates/save",  method: "post"},
          { label: "Update Email Template", url: "/api/admin/email-templates/save/:id", method: "put" },
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
          { label: "Get Roles", url: "/api/admin/roles", method: "get" },
          { label: "Delete Role", url: "/api/admin/roles/delete/:id", method: "delete" },
          { label: "Add Role", url: "/api/admin/roles/save",  method: "post"},
          { label: "Update Role", url: "/api/admin/roles/save/:id", method: "put" },
        ],
      },
    },
    {
      label: "Groups",
      icon: "mdi mdi-tune-vertical",
      url: "/admin/groups",
      method: "get",
      children: {
        create: [
          { label: "Get Groups & Group members", url: "/api/admin/groups", method: "get" },
          { label: "Create a Group", url: "/api/admin/groups/save", method: "post" },
          { label: "Update a Group", url: "/api/admin/groups/save/:id", method: "put" },
          { label: "Delete a Group", url: "/api/admin/groups/delete/:id", method: "delete" },
          { label: "Add a member to the Group", url: "/api/admin/groups/add-member/:id", method: "post" },
          { label: "Remove a member from a group", url: "/api/admin/groups/remove-member/:id", method: "post" },          
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
          { label: "Get Settings", url: "/api/admin/settings", method: "get" },
          { label: "Delete Setting", url: "/api/admin/settings/delete/:id", method: "delete" },
          { label: "Add Setting", url: "/api/admin/settings/save",  method: "post"},
          { label: "Update Setting", url: "/api/admin/settings/save/:id", method: "put" },
          { label: "Update Profile", url: "/api/admin/settings/update-profile", method: "get|put" },
          { label: "Change Password", url: "/api/admin/settings/change-password", method: "put" },
        ],
      },
    },
    {
      label: "Download",
      url: "/api/admin/download/@path",
      method: "get",
    },
    {
      label: "Modules",
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
