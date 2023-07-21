import { Request, Response } from "express";
import Quotes from "../models/quotes";
import Clients from "../models/clients";
import User from "../models/users";
import Products from "../models/products";
import QuoteProduct from "../models/quoteProduct";
import { sendEmail } from './mailer'; // Asegúrate de importar el módulo de tu archivo mailer



// export const quoteProduct = async (req: Request, res: Response) => {
//     let {idProduct, description, idUser, idClient,shipping_cost, total, products} = req.body

//     try {
//         let quote = await Quotes.create({
//             idProduct, description, idUser, idClient,shipping_cost, total
//         })

//         for (const product of products){
//             await QuoteProduct.create ({
//                 idQuote: quote.dataValues.id,
//                 idProduct: product.idProduct,
//                 quantity: product.quantity

//             })

//         }

       

//         res.status(200).json({
//             msg: `cotizacion creada`
//         })
        
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             msg: `cotizacion erronea`
//         })
        
        
//     }
// }

   

export const consultQuotes = async (req: Request, res: Response) => {
    const quotes = await Quotes.findAll({
        include: [
            {
              model: Clients
               // Incluir solo ciertos atributos de Clients
            },
            {
              model: User
               // Incluir solo ciertos atributos de User
            },
            {
              model:Products
            }
          ],
    }
    );

    res.status(200).json({
        msg:'Cotizaciones',
        quotes
    })
    
}
export const consultQuoteById = async(req: Request, res: Response) => {
    const {id} = req.params;
    const quote = await Quotes.findByPk(id, {
        include: [
          {
            model: Clients,
             // Incluir solo ciertos atributos de Clients
          },
          {
            model: User,
             // Incluir solo ciertos atributos de User
          },
          {
            model:Products
          }
        ],
      });

    if (quote){
        res.status(200).json({
            quote
        })
    }else{
        res.status(400).json({
            msg: 'el usuario no existe'
        }) 
    }
}

export const saveQuotes = async(req: Request, res: Response) => {

    const {quoteNumber,idProduct, amount,description, idUser, idClient, shipping_cost, total} = req.body;
    

    console.log('Cotizacion Registrada:', description);
    const quotes = await Quotes.create({
        quoteNumber,idProduct,amount, description, idUser, idClient, shipping_cost, total
    })
    

    res.status(200).json({
        msg: `Se ha registrado una cotizacion con el id: ${quotes.dataValues.id}`
    })
   
}

export const updateQuote = async(req: Request, res: Response) => {
    const {id, quoteNumber,idProduct,amount, description, idUser, idClient, shipping_cost, total} = req.body;
    console.log(req.body)

    const quotes = await Quotes.update({  quoteNumber,idProduct,amount, description, idUser, idClient, shipping_cost, total},{
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