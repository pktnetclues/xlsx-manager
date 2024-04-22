const nodemailer = require("nodemailer");
const path = require("path");

const MailSender = (name, email, rowsInserted, file, callback) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let emailContent = `
    <html>
      <head>
        <style>
            .heart {
                color: #e25555;
            }
            
        </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 20px;">
              <h1 style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-top: 20px;">
                Hello ${name}!
              </h1>
              <p style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 16px; margin-top: 20px;">
                ${rowsInserted} rows were successfully inserted.
              </p>
              <div style="margin-top: 20px; text-align: center;">
                <span style="color: #2c3e50; font-family: Arial, sans-serif; font-size: 14px;">
                  Made by Pankaj Thakur
                </span>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  console.log(file);

  const mailOptions = {
    from: "Pankaj Thakur 👻",
    to: email,
    subject: `Data Insertion Report for ${name}`,
    html: emailContent,
    attachments: [
      {
        filename: file.originalname,
        path: file.path,
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
