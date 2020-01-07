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
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
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
                },
            },
            unique: {
                args: true,
                msg: "The email address has already been registered"
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter a password"
                },
                notEmpty: {
                    msg: "Please enter a password"
                }
            }
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