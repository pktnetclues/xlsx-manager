import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ pb: 5, width: "100%" }}>
      <Paper
        sx={{
          zIndex: 100,
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "500px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          borderTop: "1px solid #e0e0e0",
          opacity: 0.9,
          backdropFilter: "blur(20px)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => {
              navigate("/");
            }}
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Create"
            onClick={() => {
              navigate("/post");
            }}
            icon={<CreateIcon />}
          />

          <BottomNavigationAction
            onClick={() => {
              navigate("/my/posts");
            }}
            label="My Tweets"
            icon={<FormatListBulletedIcon />}
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/profile");
            }}
            label="Profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navbar;
