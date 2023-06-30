import React, { useContext,useEffect,useState } from 'react';
// import { UserContext } from '../context/UserContext'

function Home() {
  let item = localStorage.getItem('username')
  console.log(item)

  const [username, setUsername] = useState('')
  // setUsername(item)


  useEffect(() => {
    setUsername(item); // Establecer el valor inicial de username
  }, []);

  // console.log(username)
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const mostrarOcultarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  const cleanUsername = username.replace(/"/g, '');


 

  return (
          <div>
            <h1>Bienvenido {cleanUsername}</h1>
            {/* <ResponsiveAppBar/> */}
            
            <div className="d-flex align-items-center justify-content-center" >
              <div className="card p-4" style={{ width: "300px" }}>
              {cleanUsername.startsWith('a') && (
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

