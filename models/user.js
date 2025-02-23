const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );

  User.createNew = ({ username, email, password }) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (hash && !err) {
        User.create({
          userid: uuid(),
          username,
          email,
          password: hash
        });
      }
    });
  };

  User.alreadyExists = ({ username, email }) => {
    const or = Sequelize.Op.or;
    return User.findOne({
      where: {
        [or]: [{ username }, { email }]
      }
    }).then(found => {
      if (!found) return false;
      return true;
    });
  };

  User.associate = function(models) {};
  return User;
};
