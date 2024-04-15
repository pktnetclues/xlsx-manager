import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Container } from "@mui/material";
import { toast } from "sonner";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const errMess = {
  message: "This field is required",
};

const validationSchema = yup.object().shape({
  name: yup.string().required(errMess.message),
  email: yup.string().required(errMess.message).email("Email is Invalid"),
  xlsx: yup
    .mixed()
    .test("file", "Please upload a file", (file) => {
      return file && file.length > 0;
    })
    .test("fileType", "Only XLSX files are allowed", (file) => {
      console.log(file[0]?.type);
      const acceptedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      return file && acceptedTypes.includes(file[0]?.type);
    })
    .test("fileSize", "The file is too large", (file) => {
      return file && file[0]?.size < 5000000;
    }),
});

const UploadXlsx = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      xlsx: data.xlsx[0],
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/upload`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        toast.success("Data Inserted Successfully");
        navigate("/show");
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const handleError = (error) => {
    let errorMessage = "An error occurred. Please try again.";
    if (error.response && error.response.status === 400) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  };

  return (
    <>
      <Container maxWidth="xs">
        <form
          name="form"
          className="shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="h4 mb-2 text-center">Upload Xlsx</div>

          <TextField
            id="name"
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <TextField
            id="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <TextField
            id="xlsx"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
            accept=".xlsx"
            error={!!errors.xlsx}
            helperText={errors.xlsx?.message}
            {...register("xlsx")}
            fullWidth
            variant="outlined"
            margin="normal"
          />

          {!loading ? (
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Upload
            </Button>
          ) : (
            <Button variant="contained" color="primary" disabled fullWidth>
              Uploading...
            </Button>
          )}
        </form>
      </Container>
    </>
  );
};

export default UploadXlsx;
