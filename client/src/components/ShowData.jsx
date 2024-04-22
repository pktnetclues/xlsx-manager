import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

function ShowData() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/get")
      .then((response) => {
        console.log(response.data);
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

  const handleDeleteData = async () => {
    try {
      const response = await axios.delete("http://localhost:4000/api/delete");
      if (response.status == 200) {
        toast.success("Data Deleted Successfully");
        navigate("/");
        handleClose();
      }
    } catch (error) {
      toast.error("There is something wrong");
    }
  };

  const columns = [
    { field: "ProductName", headerName: "Product Name", width: 150 },
    { field: "ID", headerName: "ID", width: 90 },
    { field: "SKU", headerName: "SKU", width: 120 },
    { field: "CategoryName", headerName: "Category Name", width: 150 },
    { field: "Price", headerName: "Actual Price", type: "number", width: 120 },
    {
      field: "DiscountedPrice",
      headerName: "Discounted Price",
      type: "number",
      width: 160,
    },
    { field: "Description", headerName: "Description", width: 250 },
  ];

  const rowss = products.map((product) => ({
    ...product,
    id: product.VariantID,
  }));

  console.log(rowss);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowss}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        paginationMode="client"
        disableSelectionOnClick
      />
      <Grid className="grid" container columnSpacing={3}>
        <div>
          <Button variant="contained" onClick={downloadData}>
            Download Data
          </Button>
        </div>
        <div>
          <Button variant="outlined" color="error" onClick={handleClickOpen}>
            Delete Data
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title2"
            aria-describedby="alert-dialog-description2"
          >
            <DialogTitle id="alert-dialog-title2">
              Are You Sure You Want To Delete
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDeleteData} autoFocus>
                Delete Data
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </div>
  );
}

export default ShowData;
