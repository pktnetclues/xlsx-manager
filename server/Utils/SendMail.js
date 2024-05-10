const nodemailer = require("nodemailer");
const path = require("path");

const MailSender = async (name, email, file, callback) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let emailContent = `
    <html>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 20px;">
              <h1 style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-top: 20px;">
                Hello ${name}!
              </h1>
              <p style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 16px; margin-top: 20px;">
                Your HTML File is conerted to pdf, Please check the attachment
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  console.log(file);

  const mailOptions = {
    from: "Pankaj Thakur",
    to: email,
    subject: `PDF File for Uploaded html`,
    html: emailContent,
    attachments: [
      {
        path: file,
        filename: `${name}.pdf`,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      callback(error);
    } else {
      console.log("Email sent");
      callback(null);
    }
  });
};

module.exports = MailSender;
