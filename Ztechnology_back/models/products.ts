import {DataTypes} from 'sequelize'
import { db } from '../db/connection'

const Products = db.define ('products', {
  
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    stock: {
        type: DataTypes.INTEGER
    }
  


});

export default Products;