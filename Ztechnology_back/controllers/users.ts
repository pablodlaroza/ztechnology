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

    const {username, password, idRol,state} = req.body;
    

    console.log('Username Registrado:', username);
    const user = await User.create({
        username, password, idRol, state
    })
    

    res.status(200).json({
        msg: `Se ha registrado un usuario con el id: ${user.dataValues.id}`
    })
   
}

export const updateUser = async(req: Request, res: Response) => {
    const {id, username, password, idRol, state} = req.body;
    console.log(req.body)

    const user = await User.update({username,password, idRol, state},{
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el usuario con el id ${id} ha sido actualizado`
    })
}

export const deleteUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    console.log(req.body)

    await User.destroy({
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el usuario con el id ${id} ha sido eliminado`
    })
}

