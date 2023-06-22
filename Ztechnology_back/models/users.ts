import {DataTypes} from 'sequelize'
import { db } from '../db/connection'

const User = db.define ('users', {
  
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    idRol: {
        type: DataTypes.BIGINT
    }


});

export default User;