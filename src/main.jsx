import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"
import './index.css'
import { ItemsContextProvider } from './context/ItemsContext'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItemsContextProvider >
          <App />
        </ItemsContextProvider> 
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
