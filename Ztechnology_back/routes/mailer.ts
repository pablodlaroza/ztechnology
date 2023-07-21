import express from 'express';
const router = express.Router();
import Server from '../models/server'; // Replace with the correct path to your Server class

const server = new Server();

router.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    const result = await server.sendEmail(to, subject, body);
    if (result) {
      res.send('Correo enviado exitosamente');
    } else {
      res.status(500).send('Error al enviar el correo electrónico');
    }
  } catch (error) {
    res.status(500).send('Error al enviar el correo electrónico');
  }
});

export default router;
