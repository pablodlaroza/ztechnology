import {DataTypes} from 'sequelize'
import { db } from '../db/connection'
import Clients from './clients';
import User from './users';
import Products from './products';
import UserDetails from './userDetails';

const Quotes = db.define ('quotes', {
    quoteNumber: {
        type: DataTypes.STRING
    },
    idProduct:{
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.INTEGER
    },

    description: {
        type: DataTypes.STRING
    },
    idUser: {
        type: DataTypes.STRING
    },
    idClient: {
        type: DataTypes.STRING
    },
    shipping_cost: {
        type: DataTypes.STRING
    },
    total : {
        type: DataTypes.STRING
    },
});
Quotes.belongsTo(Clients, { foreignKey: 'idClient' });
Clients.hasMany(Quotes, { foreignKey: 'idClient' });

Quotes.belongsTo(UserDetails, { foreignKey: 'idUser' });
UserDetails.hasMany(Quotes, { foreignKey: 'idUser' });



Quotes.belongsTo(Products,{foreignKey: 'idProduct'})
Products.hasMany(Quotes,{foreignKey: 'idProduct'})//Products puede tener múltiples objetos Quotes.

export default Quotes;