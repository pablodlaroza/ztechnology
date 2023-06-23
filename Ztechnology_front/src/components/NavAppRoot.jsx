import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import '../css/Root.css'




const NavAppRoot = () => {



    return (

        <>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Iniciar Sesion</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Sobre Nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contactenos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
           
        </>




    )

}

export default NavAppRoot;