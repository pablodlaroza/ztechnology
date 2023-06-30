import {Routes, Route, Link, BrowserRouter, useLocation} from 'react-router-dom'
import React, { useEffect } from 'react'
import LoginApp from './LoginApp'
import Home from './Home'
import UserProvider from '../providers/UsersProvider'
import Users from './Users'
import Clients from './Clients'
import ResponsiveAppBar from '../components/molecules/ResponsiveAppBar/ResponsiveAppBar'
import { useState } from 'react'

function MainApp() {
           
         
            
  return (
    <>
      <UserProvider>
      <BrowserRouter>
          {window.location.pathname !== "/" && <ResponsiveAppBar />}
            <Routes>
              <Route path="/" element={<LoginApp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Usuarios" element={<Users />} />
              <Route path="/Cotizaciones" element={<Users />} />
              <Route path="/Productos" element={<Users />} />
              <Route path="/Clientes" element={<Clients />} />
            </Routes>
      </BrowserRouter>

      </UserProvider>
    </>
  )
}

export default MainApp