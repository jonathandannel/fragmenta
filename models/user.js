const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );

  User.createNew = ({ username, email, password }) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (hash && !err) {
        User.create({
          username,
          email,
          password: hash,
        });
      }
    });
  };

  User.checkIfExists = ({ username, email }) => {
    // Where username = username OR email = email
    const or = Sequelize.Op.or;
    return User.findOne({
      where: {
        [or]: [{ username }, { email }],
      },
    }).then(found => {
      if (!found) return false;
      return true;
    });
  };

  User.associate = function(models) {};
  return User;
};
