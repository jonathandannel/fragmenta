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
      userid: DataTypes.UUID,
      final: DataTypes.BOOLEAN
    },
    {}
  );

  Image.createNew = ({ url, userid, final }) => {
    return Image.create({
      imageid: uuid(),
      path: url,
      userid,
      final
    });
  };

  Image.getAllUploadsByUserId = ({ userid }) => {
    return Image.findAll({
      where: {
        userid,
        final: 0
      }
    });
  };

  Image.getAllFinalPhotosByUserId = ({ userid }) => {
    return Image.findAll({
      where: {
        userid,
        final: 1
      }
    });
  };

  Image.associate = function(models) {};
  return Image;
};
