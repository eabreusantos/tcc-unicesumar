import { Sequelize } from "sequelize";
import dotenv from 'dotenv/config.js'

const dbname = process.env.DB_NAME
const dbuser = process.env.DB_USER
const dbpass = process.env.DB_PASS
const dbhost = process.env.DB_HOST
const dbport = process.env.DB_PORT

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
    dialect: "mysql", 
    host: dbhost,
    port: dbport
  });
  
  export default sequelize;