const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

module.exports = function UserModel(sequelize) {
  User.init(
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
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
