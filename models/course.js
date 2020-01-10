const Sequelize = require('sequelize');

module.exports = sequelize => {
    class Course extends Sequelize.Model {}
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide an integer value for \"userId\""
                },
                notEmpty: {
                    msg: "Please provide an integer value for \"userId\""
                },
            }
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter the course title"
                },
                notEmpty: {
                    msg: "Please enter the course title"
                }
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter the course description"
                },
                notEmpty: {
                    msg: "Please enter the course description"
                }
            }
        },
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materialsNeeded:{
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, {sequelize});

    Course.associate = models => {
        Course.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
    };

    return Course;
}