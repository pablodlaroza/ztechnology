import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { format, utcToZonedTime } from 'date-fns-tz';

function Home() {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/quotes/consultQuotes');
        console.log(response.data.quotes);
        setBars(response.data.quotes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Función para formatear las fechas y convertirlas a la zona horaria adecuada
  const formatDate = (date) => {
    const zonedDate = utcToZonedTime(new Date(date), 'America/Bogota');
    return format(zonedDate, 'EEEE'); // Formatear la fecha a día de la semana (ejemplo: "lunes", "martes", etc.)
  };

  // Agrupar las cotizaciones por fecha y calcular el total para cada producto en esa fecha
  const groupedData = bars.reduce((acc, curr) => {
    const { createdAt, idProduct, total } = curr;
    const productKey = `product${idProduct}`;

    const formattedDate = formatDate(createdAt);

    if (!acc[formattedDate]) {
      acc[formattedDate] = { day: formattedDate }; // Utilizar la fecha formateada como clave
    }

    acc[formattedDate][productKey] = (acc[formattedDate][productKey] || 0) + parseFloat(total);
    return acc;
  }, {});

  // Convertir los datos agrupados en un array para usar en el gráfico
  const data = Object.values(groupedData);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        
        <BarChart width={1200} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="product2" name="Celular aipone" fill="#8884d8" />
          <Bar dataKey="product3" name="Cargador" fill="#82ca9d" />
          <Bar dataKey="product7" name="Licuadora" fill="#ffc658" />
        </BarChart>
      </div>
    </div>
  );
}

export default Home;
