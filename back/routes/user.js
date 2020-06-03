const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const passport = require("passport");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});
router.post("/", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    // console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { Id: parseInt(req.params.id, 10) },
      include: [
        {
          model: db.Post,
          as: "Posts",
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id"],
        },
      ],
      attributes: ["id", "nickname"],
    });
    // 누가 팔로우 팔로잉인지 노출되는것이 민감한 정보일 수 있음
    const jsonUser = user.toJSON();
    console.log(jsonUser);
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    console.log(jsonUser);
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
        RetweetId: null,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        { model: db.Image },
        { model: db.User, through: "Like", as: "Likers", attributes: ["id"] },
      ],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("로그아웃 성공");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: "Posts",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"],
            },
          ],
          attributes: ["id", "nickname", "userId"],
        });
        // 시퀄라이즈에서 나오는 데이터는 json형태로 바꿔줘야한다.
        // const filteredUser = Object.assign({}, user.toJSON());
        // delete filteredUser.password;
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout 성공");
});

router.get("/:id/followings", isLoggedIn, async (req, res, next) => {
  // /api/user/:id/followings
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
      },
    });
    const followers = await user.getFollowings({
      attributes: ["id", "nickname"],
      offset: parseInt(req.query.offset, 10),
      limit: parseInt(req.query.limit, 10),
    });
    res.json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/followers", isLoggedIn, async (req, res, next) => {
  // /api/user/:id/followers
  try {
    const user = await db.User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
      },
    });
    const followers = await user.getFollowers({
      attributes: ["id", "nickname"],
      offset: parseInt(req.query.offset, 10),
      limit: parseInt(req.query.limit, 10),
    });
    console.log(followers);
    res.json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/follower", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.send(req.body.nickname);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
