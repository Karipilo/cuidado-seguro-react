import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/navbar.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/cards.css";
import "./styles/dashboard.css";
import "./styles/home.css";
import "./index.css";
import "./styles/formulario.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
