import { Request, Response } from "express";
import Quotes from "../models/quotes";
import Clients from "../models/clients";

export const consultQuotes = async (req: Request, res: Response) => {
    const quotes = await Quotes.findAll(
    );

    res.status(200).json({
        msg:'Cotizaciones',
        quotes
    })
    
}

export const saveQuotes = async(req: Request, res: Response) => {

    const {description, idSeller, idDiscount, shipping_cost, total} = req.body;
    

    console.log('Cotizacion Registrada:', description);
    const quotes = await Quotes.create({
        description, idSeller, idDiscount, shipping_cost, total
    })
    

    res.status(200).json({
        msg: `Se ha registrado una cotizacion con el id: ${quotes.dataValues.id}`
    })
   
}

export const updateQuote = async(req: Request, res: Response) => {
    const {id, description, idSeller, idDiscount, shipping_cost, total} = req.body;
    console.log(req.body)

    const quotes = await Quotes.update({ description, idSeller, idDiscount, shipping_cost, total},{
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `la cotizacion ${id} ha sido actualizada`
    })
}

export const deleteQuote = async(req: Request, res: Response) => {
    const {id} = req.params;
    console.log(req.body)

    await Quotes.destroy({
        where:{
            id
        }
    })

    res.status(200).json({
        msg: `la cotizacion ${id} ha sido eliminada`
    })
}