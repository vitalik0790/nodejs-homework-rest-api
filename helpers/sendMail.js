const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "firsttest@meta.ua",
    pass: process.env.PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

const mailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: "Developer of this server",
    link: "https://localhost:3000/",
  },
});

const sendMail = async (verifyToken, email) => {
  const template = {
    body: {
      name: email,
      intro: "Email verification needed",
      action: {
        instructions:
          "To complete the registration process please press the button:",
        button: {
          color: "#008000", // Optional action button color
          text: "Confirm email",
          link: `http://localhost:3000/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Please figure it out yourselves, we can't be bothered to help you",
    },
  };

  const verificationMail = mailGenerator.generate(template);

  const emailOptions = {
    from: "firsttest@meta.ua",
    to: email,
    subject: "Email verification",
    html: verificationMail,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendMail;
