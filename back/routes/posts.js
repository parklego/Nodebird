const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
      order: [["createdAt", "DESC"]], // 내림차순
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("images", (req, res) => {});

module.exports = router;
