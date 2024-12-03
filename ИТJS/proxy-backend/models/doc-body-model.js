const Sequelize = require('sequelize');
const sequelize = require('../connection');

const DocBodyModel = sequelize.define(
    'docbody',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rasp: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        otkuda: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        kuda: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        rasst: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        classId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        chislo: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        kolvo: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ves: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        docHeaderId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = DocBodyModel;