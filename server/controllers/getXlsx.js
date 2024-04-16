const xlsx = require("xlsx");
const { QueryTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

const getXlsx = async (req, res) => {
  try {
    const query = `
      SELECT p.ProductName, p.ID, p.SKU, p.VariantID, p.CategoryID, c.CategoryName, p.Price, p.DiscountPercentage,
      (p.Price - (p.Price * p.DiscountPercentage / 100)) AS DiscountedPrice,
      p.Description
      FROM products AS p
      INNER JOIN categories AS c ON p.CategoryID = c.CategoryID
    `;

    const products = await sequelize.query(query, { type: QueryTypes.SELECT });

    const data = products.map((product) => ({
      ...product,
      DiscountedPrice:
        product.Price - (product.Price * product.DiscountPercentage) / 100,
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).send("An error occurred while exporting data.");
  }
};

module.exports = getXlsx;
