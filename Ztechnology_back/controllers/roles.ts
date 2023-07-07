// import { Request, Response } from "express";

// // import Role from "../models/roles";

// export const consultRoles = async (req: Request, res: Response) => {
//     const roles = await Role.findAll({
//         attributes: ['name', 'description']
//     });

//     res.status(200).json({
//         msg:'Roles',
//         roles
//     })
    
// }

// export const saveRoles = async(req: Request, res: Response) => {

//     const {name, description} = req.body;
    

//     console.log('Cotizacion Registrada:', name);

//     const roles = await Role.create({
//         name, description
//     })
    

//     res.status(200).json({
//         msg: `Se ha registrado un rol  ${roles.dataValues.name}`
//     })
   
// }

// export const updateRole = async(req: Request, res: Response) => {
//     const {id, name, description} = req.body;
//     console.log(req.body)

//     const roles = await Role.update({ name, description},{
//         where:{
//             id
//         }
//     })

//     res.status(200).json({
//         msg: `el rol ${name} ha sido actualizado`
//     })
// }

// export const deleteRole = async(req: Request, res: Response) => {
//     const {id} = req.params;
//     console.log(req.body)

//     await Role.destroy({
//         where:{
//             id
//         }
//     })

//     res.status(200).json({
//         msg: `El rol ${id} ha sido eliminado`
//     })
// }