import express, {Application} from 'express';
import cors from 'cors';

import {db} from '../db/connection'
import userRoutes from '../routes/users'
import clientsRoutes from '../routes/clients'
import quotesRoutes from '../routes/quotes'
import productRoutes from '../routes/products'
import authRoutes from '../routes/auth'



class Server {
    private app: Application;
    private port: string | undefined ;
    private apiPaths ={
        auth: '/api/auth',
        users: '/api/users',
        clients: '/api/clients',
        products: '/api/products',
        quotes: '/api/quotes',
        

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
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.users, userRoutes)
        this.app.use(this.apiPaths.clients, clientsRoutes)
        this.app.use(this.apiPaths.quotes, quotesRoutes)
        this.app.use(this.apiPaths.products, productRoutes)
        
     }

     listen(){
        this.app.listen(this.port, ()=> {
            console.log('se esta ejecutando en el puerto', this.port)
        })
     }

    
    



}

export default Server;