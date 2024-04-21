const { QueryTypes } = require("sequelize");
const { sequelize } = require("./models"); // Assuming you have set up Sequelize and imported models

// Controller function for liking a post
const likePost = async (req, res) => {
  const { postid, userid } = req.body;

  try {
    // Check if the user has already liked the post
    const existingLike = await sequelize.query(
      `SELECT * FROM likes WHERE postid = :postid AND userid = :userid LIMIT 1`,
      {
        replacements: { postid, userid },
        type: QueryTypes.SELECT,
      }
    );

    if (existingLike.length > 0) {
      return res
        .status(400)
        .json({ error: "You have already liked this post." });
    }

    // Check if the user has disliked the post before
    const existingDislike = await sequelize.query(
      `SELECT * FROM dislikes WHERE postid = :postid AND userid = :userid LIMIT 1`,
      {
        replacements: { postid, userid },
        type: QueryTypes.SELECT,
      }
    );

    if (existingDislike.length > 0) {
      // User has previously disliked the post, remove the dislike
      await sequelize.query(
        `DELETE FROM dislikes WHERE postid = :postid AND userid = :userid`,
        { replacements: { postid, userid } }
      );
    }

    // Add like to database
    await sequelize.query(
      `INSERT INTO likes (postid, userid) VALUES (:postid, :userid)`,
      { replacements: { postid, userid } }
    );

    return res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    console.error("Error liking post:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while liking the post." });
  }
};

// Controller function for disliking a post
const dislikePost = async (req, res) => {
  const { postid, userid } = req.body;

  try {
    // Check if the user has already disliked the post
    const existingDislike = await sequelize.query(
      `SELECT * FROM dislikes WHERE postid = :postid AND userid = :userid LIMIT 1`,
      {
        replacements: { postid, userid },
        type: QueryTypes.SELECT,
      }
    );

    if (existingDislike.length > 0) {
      return res
        .status(400)
        .json({ error: "You have already disliked this post." });
    }

    // Check if the user has liked the post before
    const existingLike = await sequelize.query(
      `SELECT * FROM likes WHERE postid = :postid AND userid = :userid LIMIT 1`,
      {
        replacements: { postid, userid },
        type: QueryTypes.SELECT,
      }
    );

    if (existingLike.length > 0) {
      // User has previously liked the post, remove the like
      await sequelize.query(
        `DELETE FROM likes WHERE postid = :postid AND userid = :userid`,
        { replacements: { postid, userid } }
      );
    }

    // Add dislike to database
    await sequelize.query(
      `INSERT INTO dislikes (postid, userid) VALUES (:postid, :userid)`,
      { replacements: { postid, userid } }
    );

    return res.status(200).json({ message: "Post disliked successfully." });
  } catch (error) {
    console.error("Error disliking post:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while disliking the post." });
  }
};

module.exports = { likePost, dislikePost };
