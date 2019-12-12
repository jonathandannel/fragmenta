const Sequelize = require('sequelize');

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
    User.create({
      username,
      email,
      password,
    });
  };

  User.alreadyExists = async ({ username, email }) => {
    // Where username = username OR email = email
    const or = Sequelize.Op.or;
    const results = await User.findOne({
      where: {
        [or]: [{ username }, { email }],
      },
    });
    if (results) return true;
    return false;
  };

  User.associate = function(models) {};
  return User;
};
