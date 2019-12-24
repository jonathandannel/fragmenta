const uuid = require("uuid/v4");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      imageid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      path: DataTypes.STRING,
      userid: DataTypes.UUID
    },
    {}
  );

  Image.createNew = ({ url, userid }) => {
    return Image.create({
      imageid: uuid(),
      path: url,
      userid
    });
  };

  Image.getAllByUserId = ({ userid }) => {
    return Image.findAll({
      where: {
        userid
      }
    });
  };

  Image.associate = function(models) {};
  return Image;
};
