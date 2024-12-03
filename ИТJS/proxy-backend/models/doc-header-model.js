const Sequelize = require('sequelize');
const sequelize = require('../connection');

const DocHeaderModel = sequelize.define(
    'docheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        num: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        organizationId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        trackId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        markId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        individualId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        pric: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        brigId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        OKUD: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        OKPO: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        tabel: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        registr: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        inventnum: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        otdel: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        brigada: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        
    },
    {
        timestamps: false,
    }
);

module.exports = DocHeaderModel;