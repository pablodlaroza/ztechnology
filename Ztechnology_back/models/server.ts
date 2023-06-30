import express, {Application} from 'express';
import cors from 'cors';

import {db} from '../db/connection'
import userRoutes from '../routes/users'
import clientsRoutes from '../routes/clients'
import quotesRoutes from '../routes/quotes'
import productRoutes from '../routes/products'
import rolesRoutes from '../routes/roles'


class Server {
    private app: Application;
    private port: string | undefined ;
    private apiPaths ={
        users: '/api/users',
        clients: '/api/clients',
        products: '/api/products',
        quotes: '/api/quotes',
        roles: '/api/roles',

    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.middlewares()
        this.dbConnection()
        this.routes()

        
    }
    
     async dbConnection(){
        try {
            await db.authenticate();
            console.log('database online')
        } catch (error) {
            console.log(error)
            
        }
     }

     middlewares(){
         this.app.use(express.json())
         this.app.use(cors())
         //Configurar la carpeta static
         this.app.use('/uploads', express.static('static'))
         
     }
     
     routes(){
        this.app.use(this.apiPaths.users, userRoutes)
        this.app.use(this.apiPaths.clients, clientsRoutes)
        this.app.use(this.apiPaths.quotes, quotesRoutes)
        this.app.use(this.apiPaths.products, productRoutes)
        this.app.use(this.apiPaths.roles, rolesRoutes)
     }

     listen(){
        this.app.listen(this.port, ()=> {
            console.log('se esta ejecutando en el puerto', this.port)
        })
     }

    
    



}

export default Server;