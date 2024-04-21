import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Divider } from "@mui/material";

const DetailedCard = () => {
  const handleLike = () => {};
  const handleDislike = () => {};
  const handleCommentClick = () => {};
  const handleCommentChange = () => {};
  const handleCommentSubmit = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        mt: 5,
        mb: 5,
        width: "25%",
        bgcolor: "background.default",
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
      </Box>
      <Box>
        <Typography variant="h6" component="h4">
          What is Javascript?
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          JavaScript is a programming language that enables you to interact with
          web pages. It is used to create interactive effects within web
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
              {liked ? <ThumbUpIcon sx={{ color: "blue" }} /> : <ThumbUpIcon />}
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

      <Typography variant="h6" component="h4" mt={2}>
        Comments
      </Typography>
      <Divider />

      <Box mt={2}>
        {comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar src={""} alt={""} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 1,
              }}
            >
              <Typography variant="subtitle1">{comment.author}</Typography>
              <Typography variant="body2" color="textSecondary">
                {comment.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const images = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];

// Static comments data
const comments = [
  { author: "John Doe", text: "Great post!" },
  { author: "Jane Doe", text: "I found this very helpful." },
  { author: "Jane Doe", text: "I found this very helpful." },
  { author: "Jane Doe", text: "I found this very helpful." },
  { author: "Jane Doe", text: "I found this very helpful." },
  { author: "Jane Doe", text: "I found this very helpful." },
  // Add more comments as needed
];

const liked = false;
const likes = 123;
const disliked = false;
const dislikes = 4;
const commentCount = 5;
const showCommentInput = true;
const commentText = "";

export default DetailedCard;
