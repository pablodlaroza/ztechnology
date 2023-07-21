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
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BIGINT
    },
    loginAttempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
    },
    blockedUntil: {
        type: DataTypes.DATE
    }

});
        User.belongsTo(Role,{
            foreignKey: 'idRol'
        })



export default User;