const { PrismaClient } = require("@prisma/client");
import prisma from "@/utils/prisma";

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
};

module.exports = emailTemplateSeeder;
