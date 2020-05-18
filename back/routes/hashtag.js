const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.name) },
          // 서버에서 한글이나 특수문자가 주소에 들어가야 할 때 !
        },
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
