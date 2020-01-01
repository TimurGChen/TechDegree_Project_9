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
            validate: {
                notNull: {
                    msg: "Please enter your first name"
                },
                notEmpty: {
                    msg: "Please enter your first name"
                }
            }
        },
        lastName: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter your last name"
                },
                notEmpty: {
                    msg: "Please enter your last name"
                }
            }
        },
        emailAddress: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide your email"
                },
                notEmpty: {
                    msg: "Please provide your email"
                },
                isEmail: {
                    msg: "Please enter a valid email address - for@example.com"
                }
            }
        },
        password: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, { sequelize });

    User.associate = models => {
        User.hasMany(models.Course, {
            as: 'user',
            foreignKey: 'userId'
        });        
    };

    return User;
}