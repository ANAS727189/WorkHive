import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="483003452953-40uav5nf4adjq0mcl5g87jghtrblh4pe.apps.googleusercontent.com"  redirectUri="http://localhost:3000/callback">
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
  </React.StrictMode>,
)
