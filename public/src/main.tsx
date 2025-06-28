import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const app = document.getElementById('root')!

createRoot(app).render(<App />)
