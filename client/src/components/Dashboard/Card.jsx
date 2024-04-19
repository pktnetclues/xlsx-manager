import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Input,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";

const images = [
  "https://source.unsplash.com/random/800x600",
  "https://source.unsplash.com/random/800x601",
  "https://source.unsplash.com/random/800x602",
];

const PostCard = ({ title, description, userName, userImage }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

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

  const handleCommentClick = () => {
    setShowCommentInput(true);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setCommentCount(commentCount + 1);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        overflowX: "auto", // Enable horizontal scroll
        whiteSpace: "nowrap", // Prevent line breaks
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={userImage} alt={userName} />
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          {userName}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{ mb: 2 }}
        >
          {description}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-block",
                mr: 1,
                "&:last-child": {
                  mr: 0,
                },
              }}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                style={{
                  width: 100, // Adjust image width as needed
                  height: 100, // Adjust image height as needed
                  objectFit: "cover",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
                onClick={() => console.log(`Clicked on image ${index + 1}`)} // Add your logic for handling click on individual images
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="like"
            onClick={handleLike}
            sx={{ color: "primary.main", mr: 1 }}
          >
            {liked ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography>{likes}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="dislike"
            onClick={handleDislike}
            sx={{ color: disliked ? "error.main" : "primary.main", mr: 1 }}
          >
            <FavoriteBorderIcon style={{ transform: "rotate(180deg)" }} />
          </IconButton>
          <Typography>{dislikes}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="comment"
            onClick={handleCommentClick}
            sx={{ color: "primary.main" }}
          >
            <CommentIcon />
          </IconButton>
          <Typography>{commentCount}</Typography>
        </Box>
      </Box>
      {showCommentInput && (
        <Box mt={2} display="flex" alignItems="center">
          <Input
            placeholder="Add a comment..."
            value={commentText}
            onChange={handleCommentChange}
            sx={{ flex: 1, mr: 1 }}
          />
          <IconButton
            aria-label="comment"
            onClick={handleCommentSubmit}
            sx={{ color: "primary.main" }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PostCard;
