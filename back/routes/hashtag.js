const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
          // 서버에서 한글이나 특수문자가 주소에 들어가야 할 때 !
        },
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        { model: db.Image },
        { model: db.User, through: "Like", as: "Likers", attributes: ["id"] },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            { model: db.Image },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10),
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
