import { Sequelize } from "sequelize";

export const db = new Sequelize('ztechnology', 'root', '' , {
    host: 'localhost',
    dialect: 'mysql'
})