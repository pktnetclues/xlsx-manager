import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";

function ShowData() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/get")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const downloadData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/download", {
        responseType: "blob",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.setAttribute("download", "products.xlsx");
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  const columns = [
    { field: "ProductName", headerName: "Product Name", width: 150 },
    { field: "ID", headerName: "ID", width: 90 },
    { field: "SKU", headerName: "SKU", width: 120 },
    { field: "VariantName", headerName: "Variant Name", width: 150 },
    { field: "Price", headerName: "Price", type: "number", width: 120 },
    {
      field: "DiscountedPrice",
      headerName: "Discounted Price",
      type: "number",
      width: 160,
    },
    { field: "Description", headerName: "Description", width: 250 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={products.map((product) => ({
          ...product,
          id: product.VariantID,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      <Button variant="contained" onClick={downloadData}>
        Download Data
      </Button>
    </div>
  );
}

export default ShowData;
