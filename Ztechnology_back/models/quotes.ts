import {DataTypes} from 'sequelize'
import { db } from '../db/connection'

const Quotes = db.define ('quotes', {
  
    description: {
        type: DataTypes.STRING
    },
    idSeller: {
        type: DataTypes.BIGINT
    },
    idDiscount: {
        type: DataTypes.BIGINT
    },
    shipping_cost: {
        type: DataTypes.DECIMAL
    },
    total : {
        type: DataTypes.DECIMAL
    }
  


});

export default Quotes;