import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { WeatherApp } from './WeatherApp'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppTheme } from './theme/AppTheme';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppTheme>
      <WeatherApp />
    </AppTheme>
  </React.StrictMode>,
)
