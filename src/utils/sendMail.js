import nodemailer from "nodemailer";
import placeholders from "./placeholders";

import common from "./common";
import ejs from "ejs";
import prisma from "@/utils/prisma";

const sendMail = async (
  options = {
    to: "", // required
    templateId: "", // required
    modelsData: {}, // required
  }
) => {
  try {
    // Setup Transporter
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD,
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,      
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailData = await createMailData(
      options.templateId,
      options.modelsData
    );
    const info = await transporter.sendMail({
      to:
        process.env.TEST_USER_EMAIL.length > 5
          ? process.env.TEST_USER_EMAIL
          : options.to,
      ...mailData,
    });
    return info?.accepted && info?.accepted.length > 0 ? true : false;
  } catch (error) {
    return error.message;
  }
};

const createMailData = async (templateId, modelsData = {}) => {
  const placeholdersData = placeholders(modelsData);
  if (templateId) {
    const mailData = await prisma.email_templates.findUnique({
      where: {
        id: parseInt(templateId),
      },
    });
    if (mailData) {
      let content = mailData.content;
      // replace placeholders with their values
      Object.entries(placeholdersData).forEach(([placeholder, value]) => {
        if (content.includes(`[${placeholder}]`)) {
          content = content.replace(
            new RegExp(`\\[${placeholder}\\]`, "g"),
            value
          );
        }
      });
      const templatePath = common.basePath("src/ejs/email-template.ejs");
      const message = await ejs.renderFile(templatePath, {
        content: content,
      });
      return {
        subject: mailData.subject,
        from: '"' + mailData.from_label + '" <' + mailData.from_email + ">",
        html: message,
      };
    }
  }
  throw new Error("Failed to send mail..!");
};

export default sendMail;
