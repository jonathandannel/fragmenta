"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn("Images", "final", {
      type: Sequelize.BOOLEAN
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Images", "final");
  }
};
