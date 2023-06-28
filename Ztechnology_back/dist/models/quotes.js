"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Quotes = connection_1.db.define('quotes', {
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    idSeller: {
        type: sequelize_1.DataTypes.BIGINT
    },
    idDiscount: {
        type: sequelize_1.DataTypes.BIGINT
    },
    shipping_cost: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL
    }
});
exports.default = Quotes;
