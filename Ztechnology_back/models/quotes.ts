import {DataTypes} from 'sequelize'
import { db } from '../db/connection'
import Clients from './clients';
import User from './users';

const Quotes = db.define ('quotes', {
    quoteNumber: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    nombre_asesor: {
        type: DataTypes.STRING
    },
    nombre_cliente: {
        type: DataTypes.STRING
    },
    shipping_cost: {
        type: DataTypes.STRING
    },
    total : {
        type: DataTypes.STRING
    }
});

export default Quotes;