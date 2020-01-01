const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db'
});

const db = {
    Sequelize,
    sequelize,
    models: {},
};

db.models.User = require('./user')(sequelize);
db.models.Course = require('./course')(sequelize);

module.exports = db;