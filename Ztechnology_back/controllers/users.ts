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

    const{username: username, password, idRol} = req.body;
    

    const user = await User.create({
        username: username,
        password: password,
        idRol: idRol
    })
    console.log('Username recibido:', username);
    

    res.status(200).json({
        msg: `Se ha registrado un usuario con el id: ${user.dataValues.id}`
    })
   
}

