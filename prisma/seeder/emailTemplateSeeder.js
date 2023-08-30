const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const emailTemplateSeeder = async () => {
  await prisma.email_templates.upsert({
    where: { id: 1 },
    update: {},
    create: {
      subject: "Eco case invitation",
      from_email: "eco@email.com",
      from_label: "Equity Corps of Oregon",
      content: `<p>Dear [user_name],</p><p>mail content...</p>`,
    },
  });

  await prisma.email_templates.upsert({
    where: { id: 2 },
    update: {},
    create: {
      subject: "Email Verification Code - Equity Corps of Oregon",
      from_email: "eco@email.com",
      from_label: "Equity Corps of Oregon",
      content: `<p>Dear [user_name],</p><p>Your verification code is : <b> [verification_code] </b></p>`,
    },
  });

  await prisma.email_templates.upsert({
    where: { id: 3 },
    update: {},
    create: {
      subject: "Attorney Login Credentials - Equity Corps of Oregon",
      from_email: "eco@email.com",
      from_label: "Equity Corps of Oregon",
      content: `<p>Dear [user_name],</p>
      <p> Congratulations, your registration has been accepted. Now you can login with this following credentials. </p>
      <p><b>Username</b> : [user_email]</p>
      <p><b>Password</b> : [password]</p>
      <p>Please do not share this credential with anyone.</p>
      `,
    },
  });
};

module.exports = emailTemplateSeeder;
