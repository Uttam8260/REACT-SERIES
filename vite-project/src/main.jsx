import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import Chai from './Chai.jsx'
import './index.css';
import Tailwindtest from './Taliwindtest.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tailwindtest />
  </StrictMode>,
)
