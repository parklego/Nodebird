module.exports = (sequelize, DataTypes) => {
  // 테이블명이 자동으로 users처럼 된다.
  const User = sequelize.define(
    "User",
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글저장
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post, { as: "Posts" });
    db.User.hasMany(db.Comment);
    // through는 가운데 관계를 위해 생성되는 중간 테이블명
    // as는 구분을 위해 사용
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings" });
  };
  return User;
};
