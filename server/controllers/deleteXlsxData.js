const { QueryTypes } = require("sequelize");
const sequelize = require("../Utils/sequelize");

const deleteXlsxData = async (req, res) => {
  try {
    const query = `DELETE FROM products`;
    await sequelize.query(query, { type: QueryTypes.DELETE });

    res.status(200).json("Data Deleted Successfuly");
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).send("An error occurred while exporting data.");
  }
};

module.exports = deleteXlsxData;
