import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PokemonContextProvider from './context/PokemonContext.jsx'
import Footer from './components/Footer.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokemonContextProvider>
      <BrowserRouter>
        <App />
        <Footer></Footer>
      </BrowserRouter>
    </PokemonContextProvider>
  </React.StrictMode>,
)
