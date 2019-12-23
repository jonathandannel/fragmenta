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
    // TODO: Add some checks
    return Image.create({
      imageid: uuid(),
      path: url,
      userid
    });
  };

  Image.associate = function(models) {
    Image.belongsTo(models.User);
  };
  return Image;
};
