import {DataTypes} from 'sequelize'
import { db } from '../db/connection'

const Clients = db.define ('clients', {
  
    names: {
        type: DataTypes.STRING
    },
    last_names: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    adress: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }


});

export default Clients;