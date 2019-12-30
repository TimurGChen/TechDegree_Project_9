const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db'
})

const db = {
    Sequelize,
    sequelize,
    models: [],
}

module.exports = db;