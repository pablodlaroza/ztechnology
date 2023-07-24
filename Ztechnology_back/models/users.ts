import {DataTypes} from 'sequelize'
import { db } from '../db/connection'
import Role from './roles';
import UserDetails from './userDetails';

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
    idInfo: {
        type: DataTypes.INTEGER
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

        User.belongsTo(Role, { foreignKey: 'idRol' });
        Role.hasMany(User, { foreignKey: 'idRol' });

        User.belongsTo(UserDetails, { foreignKey: 'idInfo' });
        UserDetails.hasMany(User, { foreignKey: 'idInfo' });

       



export default User;