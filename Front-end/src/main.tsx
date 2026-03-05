import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import  './reset.css'
import "./App.css"
import './globals.css'
import { QueryProvider } from './providers/query.tsx'

createRoot(document.getElementById('root')!).render(
    <QueryProvider>
        <App />
    </QueryProvider>
 
)
