const passport = require("passport");
const db = require("../models");
const local = require("./local");
module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버 쪽에 가벼운 객체로 만들어서 메모리부담을 줄인다.
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
      });
      return done(null, user); // req.user
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
