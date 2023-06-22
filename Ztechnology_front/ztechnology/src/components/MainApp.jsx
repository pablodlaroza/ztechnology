import {Routes, Route, Link, BrowserRouter} from 'react-router-dom'

import React from 'react'
import LoginApp from './LoginApp'
import Home from './Home'
import UserProvider from '../providers/UsersProvider'

function MainApp() {
  return (
    <>
    <UserProvider>
        <BrowserRouter>
            <Routes>
                
                <Route path='/' element={<LoginApp/>}/>
                <Route path='/home' element={<Home/>}/>

            </Routes>

        </BrowserRouter>

    </UserProvider>
    </>
  )
}

export default MainApp