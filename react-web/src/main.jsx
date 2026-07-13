import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
            <ToastContainer  position="bottom-right" autoClose={3000}/>
            <App />
        </BrowserRouter>
  </StrictMode>,
)
