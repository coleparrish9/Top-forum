const router = require('express').Router();
const { Comment } = require('../../models');

router.post("/", async (req, res) => {
    try {
      const comment = await Comment.create({
        comment_content: req.body.comment_content,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id || req.body.user_id,
      });
  
      res.status(200).json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Blog,
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const updatedComment = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!updatedComment[0]) {
        res.status(400).json({ message: "No comment with that id exists" });
        return;
      }
  
      console.log("Comment updated!");
      res.status(200).json(updatedComment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!comment) {
        res.status(404).json({ message: "No comment with that id exists" });
        return;
      }
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;