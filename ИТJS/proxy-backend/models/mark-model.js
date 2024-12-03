const Sequelize = require('sequelize');
const sequelize = require('../connection');

const MarkModel = sequelize.define(
    'mark',
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

module.exports = MarkModel;