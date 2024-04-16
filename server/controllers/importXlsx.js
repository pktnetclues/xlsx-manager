const xlsx = require("xlsx");
const { QueryTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");
const MailSender = require("../Utils/SendMail");

const importXlsx = async (req, res) => {
  try {
    const { name, email } = req.body;
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    let uniqueData = {};
    data.forEach((item) => {
      uniqueData[item.VariantID || item.SKU] = item;
    });

    let result = Object.values(uniqueData);

    console.log(result);

    for (const row of result) {
      const {
        ProductName,
        ID,
        SKU,
        VariantID,
        CategoryID,
        Price,
        DiscountPercentage,
        Description,
      } = row;
      await sequelize.query(
        `INSERT INTO products (ProductName, ID, SKU, VariantID, CategoryID, Price, DiscountPercentage, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        {
          replacements: [
            ProductName,
            ID,
            SKU,
            VariantID,
            CategoryID,
            Price,
            DiscountPercentage,
            Description,
          ],
          type: QueryTypes.INSERT,
        }
      );
    }

    const noOfRows = data.length;
    const fName = req.file.originalname;

    MailSender(name, email, noOfRows, fName, (err) => {
      if (err) {
        console.error("Error sending email:", err);
        res.status(500).send("An error occurred while sending email.");
      }
    });

    res.status(200).send("Data inserted successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("An error occurred while uploading the file.");
  }
};

module.exports = importXlsx;
