module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      content: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Hashtag.associate = (db) => {
    // 다대다 관계는 중간에 테이블이 생성됨
    db.Hashtag.belongsToMany(db.Post, {
      through: "PostHashtag",
    });
  };
  return Hashtag;
};
