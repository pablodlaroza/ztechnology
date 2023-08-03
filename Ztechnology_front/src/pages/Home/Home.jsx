// Importar los módulos necesarios de React y otras librerías
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { format, utcToZonedTime } from 'date-fns-tz';

// Definir el componente funcional "Home"
function Home() {
  // Definir un estado local llamado "bars" y una función "setBars" para actualizarlo
  const [bars, setBars] = useState([]);

  // Utilizar el hook useEffect para cargar los datos cuando el componente se monta (equivalente a componentDidMount)
  useEffect(() => {
    // Definir una función asincrónica "fetchData" para obtener los datos desde la API
    const fetchData = async () => {
      try {
        // Realizar una solicitud HTTP GET a la API para obtener los datos de cotizaciones
        const response = await axios.get('http://localhost:3000/api/quotes/consultQuotes');
        // Imprimir los datos recibidos en la consola (solo con fines de depuración)
        console.log(response.data.quotes);
        // Actualizar el estado local "bars" con los datos obtenidos de la API
        setBars(response.data.quotes);
      } catch (error) {
        // Si ocurre un error en la solicitud, imprimirlo en la consola
        console.error('Error fetching data:', error);
      }
    };
    // Llamar a la función "fetchData" para cargar los datos
    fetchData();
  }, []);

  // Función para formatear las fechas y convertirlas a la zona horaria adecuada
  const formatDate = (date) => {
    const zonedDate = utcToZonedTime(new Date(date), 'America/Bogota');
    // Formatear la fecha a día de la semana (ejemplo: "lunes", "martes", etc.)
    return format(zonedDate, 'EEEE');
  };

  // Agrupar las cotizaciones por fecha y calcular el total para cada producto en esa fecha
  const groupedData = bars.reduce((acc, curr) => {
    // Extraer la fecha de creación, el ID del producto y el total de la cotización actual
    const { createdAt, idProduct, total } = curr;
    // Crear una clave única para cada producto basada en su ID
    const productKey = `product${idProduct}`;
    // Formatear la fecha para obtener el día de la semana
    const formattedDate = formatDate(createdAt);

    // Si la fecha actual no existe en el acumulador "acc", inicializarla con un objeto que tiene la propiedad "day"
    if (!acc[formattedDate]) {
      acc[formattedDate] = { day: formattedDate };
    }

    // Acumular el total del producto en la fecha correspondiente
    acc[formattedDate][productKey] = (acc[formattedDate][productKey] || 0) + parseFloat(total);
    return acc;
  }, {});

  // Convertir los datos agrupados en un array para usar en el gráfico
  const data = Object.values(groupedData);

  // Devolver el JSX que representa el componente
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {/* Crear el gráfico de barras utilizando Recharts */}
        <BarChart width={1200} height={500} data={data}>
          {/* Configurar la cuadrícula del gráfico */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Definir el eje X con los datos de día */}
          <XAxis dataKey="day" />
          {/* Definir el eje Y */}
          <YAxis />
          {/* Mostrar un tooltip al pasar el ratón por encima de las barras */}
          <Tooltip />
          {/* Mostrar una leyenda con los nombres de los productos */}
          <Legend />
          {/* Configurar las barras con los datos de cada producto */}
          <Bar dataKey="product2" name="Celular aipone" fill="#8884d8" />
          <Bar dataKey="product3" name="Cargador" fill="#82ca9d" />
          <Bar dataKey="product7" name="Licuadora" fill="#ffc658" />
          <Bar dataKey="product12" name="Ipad Air" fill="#334f" />
          <Bar dataKey="product14" name="Teclado" fill="#999" />
        </BarChart>
      </div>
    </div>
  );
}

// Exportar el componente "Home" para que pueda ser utilizado en otros archivos
export default Home;
