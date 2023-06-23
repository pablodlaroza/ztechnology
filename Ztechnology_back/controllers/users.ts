import { Request,Response } from "express";
import User from "../models/users";

export const consultUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.status(200).json({
        msg:'Usuarios',
        users
    })
    
}

export const saveUsers = async(req: Request, res: Response) => {

    const {username, password, idRol} = req.body;
    

    console.log('Username recibido:', username);
    const user = await User.create({
        username, password, idRol
    })
    

    res.status(200).json({
        msg: `Se ha registrado un usuario con el id: ${user.dataValues.id}`
    })
   
}

