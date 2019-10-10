const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

module.exports = function UserModel(sequelize) {
  User.init(
    {
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "user"
    }
  );

  return User;
};
