"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      userid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      path: DataTypes.STRING
    },
    {}
  );
  Image.associate = function(models) {
    Image.belongsTo(models.User);
  };
  return Image;
};
