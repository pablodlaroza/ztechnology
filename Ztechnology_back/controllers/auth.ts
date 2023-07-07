import User from "../models/users"

import  {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async(req: Request, res: Response) =>{

    const {username, password} = req.body

    try {
        const login = await User.findOne({
            //verificar si usuario existe
            where: {
                username
            }
        })
        
        if(!login){
            return res.status(400).json ({
                msg: 'el usuario no esta registrado'
            })
        }


        if(password !== login.dataValues.password){
            return res.status(400).json ({
                msg: 'usuario / contrasena incorrectos'
            })
        }else{
            return res.status(200).json ({
                msg: 'OK'
            })
        }

        // const validPassword = password
    } catch (error) {
        
    }
  
}

export default login
