import { Request, Response } from "express";
import Products from "../models/products"

export const consultProducts = async (req: Request, res: Response) => {
    const products = await Products.findAll();

    res.status(200).json({
        msg:'Clientes',
        products
    })
    
}

export const saveProducts = async(req: Request, res: Response) => {

    const {name, description, price} = req.body;
    

    console.log('Producto Registrado:', name);

    const products = await Products.create({
        name, description, price
    })
    

    res.status(200).json({
        msg: `Se ha registrado un Producto con el id: ${products.dataValues.id}`
    })
   
}

export const updateProduct = async(req: Request, res: Response) => {
    const {id, name, description, price} = req.body;
    console.log(req.body)

    const products = await Products.update({ name, description, price},{
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el producto con el id ${id} ha sido actualizado`
    })
}

export const deleteProduct = async(req: Request, res: Response) => {
    const {id} = req.params;
    console.log(req.body)

    await Products.destroy({
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `el producto con el id ${id} ha sido eliminado`
    })
}