import { DataTypes, Sequelize } from "sequelize";

import db from '../db.js'
import especialistaModel from "./especialistaModel.js";
import userModel from "./userModel.js";

const Disponibilidade = db.define('Disponibilidade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    especialista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    horario: {
        type: DataTypes.DATE,
        allowNull: false
    }
  
}, {timestamps: false, createdAt: false, updatedAt: false})

Disponibilidade.belongsTo(userModel,{
    foreignKey: 'paciente_id'
})

Disponibilidade.belongsTo(especialistaModel,{
    foreignKey: 'especialista_id'
})

export default Disponibilidade