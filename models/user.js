import crypto from "crypto";

("use strict");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      pw: {
        allowNull: false,
        type: DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      th: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      hooks: {
        beforeCreate: data => {
          if (data.pw) {
            const shasum = crypto.createHash("sha1");
            shasum.update(data.pw);
            data.pw = shasum.digest("hex");
          }
        },
        beforeFind: data => {
          if (data.where.pw) {
            console.log(data);
            const shasum = crypto.createHash("sha1");
            shasum.update(data.where.pw);
            data.where.pw = shasum.digest("hex");
          }
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
