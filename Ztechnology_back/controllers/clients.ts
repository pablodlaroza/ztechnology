import { Request, Response } from "express";
import Clients from "../models/clients";

export const consultClients = async (req: Request, res: Response) => {
    const clients = await Clients.findAll();

    res.status(200).json({
        msg:'Clientes',
        clients
    })
    
}

export const saveClients = async(req: Request, res: Response) => {

    const {names, last_names, email, adress, phone} = req.body;

    
    // const {body} = req;
    // body.photo = req.file ?.filename
    // body.idRol = 2
    // const client = Clients.create(body)

    console.log('Cliente Registrado:', names);
    const clients = await Clients.create({
        names, last_names, email, adress, phone
    })
    

    res.status(200).json({
        msg: `Se ha registrado un cliente con el id: ${clients.dataValues.id}`
    })
   
}

export const updateClient = async(req: Request, res: Response) => {
    const {id, names, last_names, email, adress, phone} = req.body;
    console.log(req.body)

    const client = await Clients.update(
        { names, last_names, email, adress, phone},{
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el cliente con el id ${id} ha sido actualizado`
    })
}

export const deleteClient = async(req: Request, res: Response) => {
    const {id} = req.params;
    console.log(req.body)

    await Clients.destroy({
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el cliente con el id ${id} ha sido eliminado`
    })
}