import nodemailer from "nodemailer";
import placeholders from "./placeholders";

const sendMail = async (
  options = {
    to: "", // ---required
    subject: "", // ---optional  
    templateId: "", // ---required
    modelsData: {}, // ---required
    withLayout: true,
  }
) => {
  try {
    // Setup Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      ...options,
    });
    return info?.accepted && info?.accepted.length > 0 ? true : false;
  } catch (error) {
    return false;
  }
};


const getEmailContent = async (templateId, modelsData = {}, layout = true) => {
  try {
    // Get placeholders
    const placeholders = placeholders(modelsData)

    if (templateId) {
      const data = await EmailTemplate.find(templateId); // Assuming EmailTemplate provides a method for finding by ID
      if (data) {
        let content = data.content;

        Object.entries(placeholders).forEach(([placeholder, value]) => {
          // Check both types of placeholders
          // Example: USER-NAME, USER_NAME
          const placeholder1 = placeholder
            .replace(/_/g, "+")
            .replace(/-/g, "+");
          const placeholder2 = placeholder
            .replace(/_/g, "-")
            .replace(/-/g, "+");

          if (content.includes(placeholder1)) {
            content = content.replace(new RegExp(placeholder1, "g"), value);
          }
          if (content.includes(placeholder2)) {
            content = content.replace(new RegExp(placeholder2, "g"), value);
          }
        });

        if (layout) {
          const templatePath = common.basePath("src/ejs/email-template.ejs");
          const emailHtml = await ejs.renderFile(templatePath, data);
          return renderView("emails.master-email", { content });
        } else {
          return content;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// Example usage
get_email_content(templateId, modelsData, true) // Replace templateId and modelsData with actual values
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });


export default sendMail;
