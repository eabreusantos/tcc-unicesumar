import { DataTypes, Sequelize } from "sequelize";

import db from '../db.js'
import especialidadeModel from "./especialidadeModel.js";

const Especialista = db.define('Especialista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    especialidade_id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {timestamps: false, createdAt: false, updatedAt: false})

Especialista.belongsTo(especialidadeModel, {
    'foreignKey': 'especialidade_id'
})


export default Especialista