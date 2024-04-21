import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MyPosts = () => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikes(likes + 1);
      if (disliked) {
        setDisliked(false);
        setDislikes(dislikes - 1);
      }
    } else {
      setLiked(false);
      setLikes(likes - 1);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setDislikes(dislikes + 1);
      if (liked) {
        setLiked(false);
        setLikes(likes - 1);
      }
    } else {
      setDisliked(false);
      setDislikes(dislikes - 1);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit post logic
    handleClose();
  };

  const handleDelete = () => {
    // Handle delete post logic
    handleClose();
  };

  const handleHide = () => {
    // Handle hide post logic
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        mt: 5,
        mb: 5,
        width: "30%",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
          p: 2,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={""} alt={""} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Pankaj Thakur
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ ml: 1, color: "text.secondary" }}
            >
              2 hours ago
            </Typography>
          </Box>

          <Box sx={{ marginLeft: "auto" }}>
            <IconButton
              aria-label="more"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={handleHide}>Hide</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" component="h4">
            What is Javascript?
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            JavaScript is a programming language that enables you to interact
            with web pages. It is used to create interactive effects within web
            browsers.
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
            <ImageList
              sx={{
                height: 200,
                flexWrap: "nowrap",
                transform: "translateZ(0)",
              }}
              cols={images.length}
            >
              {images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={image}
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" mr={2}>
              <IconButton aria-label="like" onClick={handleLike}>
                {liked ? (
                  <ThumbUpIcon sx={{ color: "blue" }} />
                ) : (
                  <ThumbUpIcon />
                )}
              </IconButton>
              <Typography>{likes}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton aria-label="dislike" onClick={handleDislike}>
                {disliked ? (
                  <ThumbDownIcon sx={{ color: "red" }} />
                ) : (
                  <ThumbDownIcon />
                )}
              </IconButton>
              <Typography>{dislikes}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton aria-label="comment" sx={{ color: "primary.main" }}>
              <CommentIcon />
            </IconButton>
            <Typography>{commentCount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const images = [
  "https://source.unsplash.com/random/400x300",
  "https://source.unsplash.com/random/400x301",
];

const timeAgo = (timestamp) => {
  const seconds = Math.floor(
    (Date.now() - new Date(timestamp).getTime()) / 1000
  );
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let interval in intervals) {
    const value = Math.floor(seconds / intervals[interval]);
    if (value >= 1)
      return value + " " + interval[0] + (value === 1 ? "" : "s") + " ago";
  }
  return;
};

export default MyPosts;
