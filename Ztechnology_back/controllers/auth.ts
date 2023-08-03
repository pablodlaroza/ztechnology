import User from "../models/users";
import { Request, Response } from 'express';
import { Op } from 'sequelize';//En esta sección, se importan los módulos y las dependencias necesarias para el funcionamiento del código
import bcrypt from 'bcryptjs';// se importa de Sequelize para usar operadores de comparación en las consultas.
import generateJWT from "../helpers/generateJWS";

const login = async (req: Request, res: Response) => {

  const { username, password } = req.body;//Se extraen el username y password del cuerpo de la solicitud

  const MAX_LOGIN_ATTEMPTS = 3;
  const BLOCKED_TIME = 2 * 60 * 60 * 1000; // 2 horas en milisegundos

  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(400).json({
        msg: 'El usuario no está registrado'
      });
    }

    const currentTime = new Date().getTime(); //Se obtiene la hora actual en milisegundos utilizando new Date().getTime()
    const blockedUntil = user.dataValues.blockedUntil ? new Date(user.dataValues.blockedUntil).getTime() : null;
    

    if (blockedUntil && blockedUntil > currentTime) {
      const remainingTime = blockedUntil - currentTime;
      

      return res.status(400).json({
        msg: 'La cuenta está bloqueada. Por favor, inténtalo más tarde.',
        blockedUntil: remainingTime // Luego, se verifica si el usuario tiene un valor en la columna blockedUntil. Si existe y el tiempo actual es menor que el blockedUntil, se devuelve una respuesta de error con el mensaje "La cuenta está bloqueada" y el tiempo restante hasta que se levante el bloqueo.
      });
    }

    const validPassword = bcrypt.compareSync(password, user.dataValues.password);//Se verifica la contraseña proporcionada con la contraseña almacenada en la base de datos utilizando bcrypt.compareSync()

    if (!validPassword) {
      
      let loginAttempts = (user.dataValues.loginAttempts || 0) + 1;//Si la contraseña no es válida, se incrementa el contador de intentos de inicio de sesión
      let newBlockedUntil = null; //se establece el tiempo de bloqueo en newBlockedUntil

      if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {//si se excede el número máximo de intentos
        newBlockedUntil = new Date(currentTime + BLOCKED_TIME);
      }

      await user.update({//se actualizan los valores en la base de datos utilizando user.update()
        loginAttempts,
        blockedUntil: newBlockedUntil
      });

      if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        return res.status(400).json({
          msg: 'La cuenta está bloqueada. Por favor, inténtalo más tarde.',
          blockedUntil: BLOCKED_TIME // Devolver el tiempo de bloqueo en milisegundos
        });
      }

      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos'
      });
    } else {
      // Restablecer el contador de intentos de inicio de sesión si el inicio de sesión es exitoso
      await user.update({
        loginAttempts: 0,
        blockedUntil: null
      });

      const token = await generateJWT(user.dataValues.id);
            console.log(token);
            return res.status(200).json({
              msg:'ok',
              token,
              user: user
              
            })

      // console.log(user);
      return res.status(200).json({
        msg: 'OK'
      });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error del servidor'
    });
  }
}

// Función para verificar y desbloquear automáticamente las cuentas cada 2 horas
const unlockAccounts = async () => {
  const currentTime = new Date().getTime();
  const users = await User.findAll({
    where: {//realiza una consulta a la base de datos para obtener todos los usuarios cuyo valor de blockedUntil sea menor o igual al tiempo actual. Esto se logra utilizando la condición { [Op.lte]: currentTime }, donde Op.lte es un operador de Sequelize que significa "menor o igua
      blockedUntil: {
        [Op.lte]: currentTime // Filtrar usuarios cuyo blockedUntil ha pasado
      }
    }
  });
//La consulta devuelve una lista de usuarios que cumplen con la condición especificada. Esta lista se almacena en la variable users.
  for (const user of users) {// continuación, se recorre la lista de usuarios utilizando un bucle for...of. Para cada usuario, se ejecuta la operación await user.update({ ... }). Esto actualiza el usuario en la base de datos estableciendo loginAttempts en 0 y blockedUntil en null, desbloqueando así la cuenta.
    await user.update({
      loginAttempts: 0,
      blockedUntil: null
    });
  }
};

// Llamar a la función unlockAccounts cada 2 horas (7200000 ms)
setInterval(unlockAccounts, 3600000);

export default login;
