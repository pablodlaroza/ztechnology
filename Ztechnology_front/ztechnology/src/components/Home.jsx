import NavApp from './NavAppRoot'
import React, { useContext,useState } from 'react';
import { UserContext } from '../context/UserContext'

function Home() {
  const { data, currentUser } = useContext(UserContext);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const mostrarOcultarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  if(currentUser.idRol !== 1){

  }



  
  console.log(currentUser)
  return (
          <div>
            <h1>Bienvenido {currentUser.username}</h1>
            <div className="d-flex align-items-center justify-content-center" >
              <div className="card p-4" style={{ width: "300px" }}>
                {currentUser.idRol == 1 && (
                  <button onClick={mostrarOcultarFormulario}>Agregar Usuarios</button>
                )}
                {mostrarFormulario && (
                  <form>
                    <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <input className="form-control" type="text" name="username" id="username" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input className="form-control" type="password" name="password" id="password" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rol">Rol:</label>
                      <select className="form-control" id="rol" name="rol">
                        <option value="">Seleccionar</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                        <option value="guest">Invitado</option>
                      </select>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
  );
}

export default Home;

