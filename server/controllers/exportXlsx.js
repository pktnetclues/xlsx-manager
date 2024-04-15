const xlsx = require("xlsx");
const { QueryTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

const exportXlsx = async (req, res) => {
  try {
    const query = `
      SELECT p.ProductName, p.ID, p.SKU, p.VariantID, v.VariantName, p.Price, p.DiscountPercentage,
      (p.Price - (p.Price * p.DiscountPercentage / 100)) AS DiscountedPrice,
      p.Description
      FROM products AS p
      INNER JOIN variants AS v ON p.VariantID = v.VariantID
    `;

    const products = await sequelize.query(query, { type: QueryTypes.SELECT });

    const data = products.map((product) => ({
      ...product,
      DiscountedPrice:
        product.Price - (product.Price * product.DiscountPercentage) / 100,
    }));

    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Products");

    const filePath = __dirname + "/products.xlsx";
    xlsx.writeFile(workbook, filePath);

    res.download(filePath, "products.xlsx", (err) => {
      if (err) {
        res.status(500).send("An error occurred while sending the file.");
      } else {
        res.status(200).json("File sent successfully.");
      }
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).send("An error occurred while exporting data.");
  }
};

module.exports = exportXlsx;
