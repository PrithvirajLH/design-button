import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'

const root = document.querySelector<HTMLDivElement>('#root')

if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
)
