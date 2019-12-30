const Sequelize = require('sequelize');

module.exports = sequelize => {
    class User extends Sequelize.Model{}
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        emailAddress: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        password: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, { sequelize });

    User.associate = models => {
        User.hasMany(models.Course, {
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                field: 'userId',
            }
        });        
    };

    return User;
}