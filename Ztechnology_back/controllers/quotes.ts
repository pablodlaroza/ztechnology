import { Request, Response } from "express";
import Quotes from "../models/quotes";
import Clients from "../models/clients";
import User from "../models/users";
import Products from "../models/products";
import QuoteProduct from "../models/quoteProduct";
import UserDetails from "../models/userDetails";



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
              model:Products
            },
            {
              model:UserDetails
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

export const saveQuotes = async (req: Request, res: Response) => {
    const { quoteNumber, idProduct, amount, description, idUser, idClient, shipping_cost, total } = req.body;

    try {
        console.log('Cotizacion Registrada:', description);

        // Obtener el producto relacionado con la cotización desde la base de datos
        const product = await Products.findByPk(idProduct);

        if (!product) {
            // Si el producto no existe, enviar una respuesta de error
            return res.status(404).json({
                msg: 'Producto no encontrado'
            });
        }

        // Obtener el valor actual de stock del producto desde la base de datos
        const currentStock = product.getDataValue("stock");

        // Verificar si hay suficiente stock para crear la cotización
        if (currentStock < amount) {
            // Si el stock es insuficiente, enviar una respuesta de error
            return res.status(400).json({
                msg: 'Stock insuficiente para crear la cotización'
            });
        }

        // Calcular el nuevo stock restando el valor de amount
        const newStock = currentStock - amount;

        // Actualizar el stock del producto en la base de datos
        await Products.update({ stock: newStock }, { where: { id: idProduct } });

        // Crear la cotización (Quote)
        const quote = await Quotes.create({
            quoteNumber,
            idProduct,
            amount,
            description,
            idUser,
            idClient,
            shipping_cost,
            total
        });

        res.status(200).json({
            msg: `Se ha registrado una cotizacion con el id: ${quote.dataValues.id}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear la cotizacion'
        });
    }
};


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