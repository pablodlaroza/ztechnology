import {DataTypes} from 'sequelize'
import { db } from '../db/connection'
import Role from './roles';

const UserDetails = db.define ('user_details', {
  
    
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
            type: DataTypes.STRING,
            
    },
    age: {
        type: DataTypes.STRING
    }

});
        



export default UserDetails;