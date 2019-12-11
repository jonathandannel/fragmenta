'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'lastName',
          {
            type: Sequelize.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'email',
          {
            type: Sequelize.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'password',
          {
            type: Sequelize.STRING,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'lastName', { transaction: t }),
        queryInterface.removeColumn('Users', 'email', { transaction: t }),
        queryInterface.removeColumn('Users', 'password', { transaction: t }),
      ]);
    });
  },
};
