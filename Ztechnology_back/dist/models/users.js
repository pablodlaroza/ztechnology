"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const User = connection_1.db.define('users', {
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    idRol: {
        type: sequelize_1.DataTypes.BIGINT
    }
});
exports.default = User;
