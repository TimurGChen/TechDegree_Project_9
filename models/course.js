const Sequelize = require('sequelize');

module.exports = sequelize => {
    class Course extends Sequelize.Model {}
    
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        materialsNeeded:{
            type: Sequelize.STRING,
            allowNull: true,
        }
    });

    Course.associate = models => {
        Course.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                field: 'userId',
            }
        });
    };
}