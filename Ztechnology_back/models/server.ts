import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { db } from '../db/connection';
import userRoutes from '../routes/users';
import clientsRoutes from '../routes/clients';
import quotesRoutes from '../routes/quotes';
import productRoutes from '../routes/products';
import authRoutes from '../routes/auth';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

class Server {
  private app: Application;
  private port: string | undefined;
  private apiPaths = {
    auth: '/api/auth',
    users: '/api/users',
    clients: '/api/clients',
    products: '/api/products',
    quotes: '/api/quotes',
  };

  private transporter!: nodemailer.Transporter;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.dbConnection();
    this.routes();

    this.configureNodemailerTransporter();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('database online');
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    // Configurar la carpeta static
    this.app.use('/uploads', express.static('static'));
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.clients, clientsRoutes);
    this.app.use(this.apiPaths.quotes, quotesRoutes);
    this.app.use(this.apiPaths.products, productRoutes);

    // Example route for sending an email
    this.app.post('/api/send-email', this.handleSendEmail);
  }

  configureNodemailerTransporter() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text: body,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return false;
    }
  }

  handleSendEmail = async (req: Request, res: Response) => {
    const { to, subject, body } = req.body;

    try {
      const result = await this.sendEmail(to, subject, body);
      if (result) {
        res.send('Correo enviado exitosamente');
      } else {
        res.status(500).send('Error al enviar el correo electrónico');
      }
    } catch (error) {
      res.status(500).send('Error al enviar el correo electrónico');
    }
  };

  listen() {
    this.app.listen(this.port, () => {
      console.log('se esta ejecutando en el puerto', this.port);
    });
  }
}

export default Server;
