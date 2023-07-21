import {DataTypes} from 'sequelize'
import { db } from '../db/connection'

const QuoteProduct = db.define('quotes_products', { 

    idQuote: {
        type: DataTypes.STRING
    },
     idProduct: {
        type: DataTypes.STRING
    },
     quantity: {
        type: DataTypes.INTEGER
    },

})

export default QuoteProduct

