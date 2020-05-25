const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");

const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const app = express();
db.sequelize.sync();
passportConfig();

// 아래 두 줄은 json형식의 본문, form을 처리하는 것
app.use(express.json()); // express에서 지원해줘서 bodyparser필요없음!
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", express.static("uploads")); // 다른서버에서 가져갈수있게
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // 자바스크립트로 접근하는 것 제한
      secure: false, // https를 쓸 때 true로 바꾸면 됨
    },
    name: "asdfasdfads",
  })
);

// 세션 이후에 패스포트를 불러와야한다. 미들웨어는 의존관계가 중요!
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`server is running on http://localhot:${port}`);
});
