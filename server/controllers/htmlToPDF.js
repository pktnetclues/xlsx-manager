const MailSender = require("../Utils/SendMail");
const fs = require("fs");
const crypto = require("crypto");
const puppeteer = require("puppeteer");

const convertHtmlToPdf = async (htmlContent, outputPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: outputPath, format: "A4" });
  await browser.close();
};

const htmlToPDF = async (req, res) => {
  try {
    const { name, email } = req.body;
    const htmlFilePath = req.file.path;

    const randomName = crypto.randomInt(10000, 99999);
    const pdfOutputPath = `./uploads/pdfs/${randomName}_${name}.pdf`;

    // Read HTML content from file
    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");

    await convertHtmlToPdf(htmlContent, pdfOutputPath);

    await MailSender(name, email, pdfOutputPath);

    res.status(200).send("HTML To PDF Converted also PDF sent in mail");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("An error occurred while uploading the file.");
  }
};

module.exports = htmlToPDF;
