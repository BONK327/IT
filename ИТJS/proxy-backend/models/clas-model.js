const Sequelize = require('sequelize');
const sequelize = require('../connection');

const ClasModel = sequelize.define(
    'clas',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = ClasModel;