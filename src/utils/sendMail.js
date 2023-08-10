import nodemailer from "nodemailer";

const sendMail = async (
  options = { to: "", subject: "", text: "", html: "" }
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
    return (info?.accepted && info?.accepted.length > 0) ? true : false;
  } catch (error) {
    return false;
  }
};

export default sendMail;