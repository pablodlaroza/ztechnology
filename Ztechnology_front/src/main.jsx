import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './lib/store'
import { Provider } from 'react-redux'


// import './index.css'
import MainApp from './pages/MainApp'

ReactDOM.createRoot(document.getElementById('root')).render(
<div >
  <React.StrictMode>
    
      <MainApp />
    
  </React.StrictMode>
</div>
)
