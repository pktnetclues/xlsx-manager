import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "sonner";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const validationSchema = yup.object().shape({
  title: yup.string().min(3).required("Title is required"),
  description: yup.string().min(10).required("Description is required"),
  tags: yup
    .string()
    .required("Tags are required")
    .trim()
    .matches(/^#[a-zA-Z]+(, #[a-zA-Z]+)*$/, "Invalid tags format"),
  category: yup.string().required("Category is required"),
  images: yup
    .mixed()
    .test("file", "You need to provide a file", (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test("fileSize", "image should be less than 1MB", (value) => {
      const files = Array.from(value);
      return files.every((file) => file.size <= 1000000);
    })
    .test("fileType", "Only images are allowed", (value) => {
      const files = Array.from(value);
      return files.every((file) => file.type.includes("image"));
    }),
});

const PostForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleNewCategorySubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/categories`,
        { name: newCategory }
      );
      setCategories([...categories, response.data]);
      setOpen(false);
      setNewCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (data) => {
    console.log(data.title);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
    formData.append("category", data.category);
    images.forEach((image) => {
      formData.append("images", image);
    });

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setLoading(false);
        toast.success("Post created successfully");
        navigate("/posts");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  // Handle remove image
  const handleRemoveImage = (index, e) => {
    e.preventDefault();
    const newImages = images.filter((image, i) => i !== index);
    setImages(newImages);
  };

  return (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
      maxWidth="xs"
    >
      <form
        name="form"
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Post
        </Typography>

        <TextField
          id="title"
          label="Title"
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title")}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <TextField
          id="description"
          label="Description"
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description")}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <TextField
          id="tags"
          label="Tags"
          error={!!errors.tags}
          helperText={errors.tags?.message}
          {...register("tags")}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <Select
          id="category"
          label="Category"
          error={!!errors.category}
          helperText={errors.category?.message}
          {...register("category")}
          fullWidth
          variant="outlined"
          defaultChecked="Javascript"
        >
          <MenuItem value={"Javascript"}>Java Script</MenuItem>
          <MenuItem value={"Python"}>Python</MenuItem>

          {/* {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))} */}
          <MenuItem value="new" onClick={() => setOpen(true)}>
            Create new category
          </MenuItem>
        </Select>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create new category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="text"
              fullWidth
              value={newCategory}
              onChange={handleNewCategoryChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleNewCategorySubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <TextField
          id="images"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.images}
          helperText={errors.images?.message}
          onChange={handleImageChange}
          inputProps={{ ...register("images") }}
          multiple
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <Box
          mb={2}
          sx={{
            padding: 1,
          }}
        >
          {images.length > 0 &&
            images.map((image, index) => (
              <Box
                key={index}
                display="inline-block"
                position="relative"
                marginRight={3}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index}`}
                  style={{ maxWidth: "70px", maxHeight: "70px" }}
                />
                <IconButton
                  color="error"
                  size="small"
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  onClick={(e) => handleRemoveImage(index, e)}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
        </Box>

        {!loading ? (
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled fullWidth>
            Creating...
          </Button>
        )}
      </form>
    </Container>
  );
};

export default PostForm;
