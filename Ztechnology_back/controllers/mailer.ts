

// Función para enviar el correo electrónico
export async function sendEmail(to: string, subject: string, body: string) {
 const recipientEmail = 'pabloroquita@gmail.com';
const emailSubject = '¡Hola desde mi backend con Nodemailer y TypeScript!';
const emailBody = 'Este es el contenido del correo enviado desde mi backend.';

sendEmail(recipientEmail, emailSubject, emailBody)
.then(() => {
  console.log('Correo enviado correctamente');
})
.catch((error) => {
  console.error('Error al enviar el correo electrónico:', error);
});
  
  console.log('email enviado')
}
