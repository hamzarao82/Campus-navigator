import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppNavigator } from './navigation/AppNavigator'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppNavigator />
  </StrictMode>,
)
