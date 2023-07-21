import React, { useEffect } from 'react'
import axios from 'axios';

function SendQuote({client, quote}) {

  console.log(client.email)
  console.log(quote.description)
  // const quoteString = JSON.stringify(quote);
  // console.log(quoteString);
  const emailData = {
    to: client.email, // Reemplaza con el correo del destinatario
    subject: 'Cotizacion Ztechnology',
    body: quote.description,
  };

  const handleSubmit= async()=>{
   try {
      const response = await axios.post('http://localhost:3000/api/send-email', emailData);
      alert(`Correo enviado exitosamente a: ${client.email}`,);
      // Puedes mostrar una notificación o mensaje de éxito aquí
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      // Puedes mostrar una notificación o mensaje de error aquí
    }
  };

  useEffect(() =>{
    if(client){
      handleSubmit(client)
    }
  },[client])

    return (
      <div>
              {/* <button >Enviar Cotización por Correo</button> */}
      </div>
    )

  }



export default SendQuote