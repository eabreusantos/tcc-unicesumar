import { DataTypes, Sequelize } from "sequelize";

import db from '../db.js'

export default db.define('Especialidade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  
}, {timestamps: false, createdAt: false, updatedAt: false})