import {DataTypes} from 'sequelize'
import { db } from '../db/connection'
import Role from './roles';

const User = db.define ('users', {
  
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    idRol: {
        type: DataTypes.BIGINT
    },
    state: {
        type: DataTypes.BOOLEAN
    }


});

User.belongsTo(Role,{
    foreignKey: 'idRol'
})

export default User;