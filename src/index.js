import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.scss'

const getBasename = () => {
  if (process.env.NODE_ENV !== 'production') {
    return '/'
  }

  if (!process.env.PUBLIC_URL) {
    return '/portifolio'
  }

  try {
    const pathname = new URL(process.env.PUBLIC_URL).pathname.replace(/\/$/, '')
    return pathname || '/portifolio'
  } catch {
    return '/portifolio'
  }
}

const basename = getBasename()

const redirectPath = sessionStorage.getItem('gh-pages-redirect')

if (redirectPath) {
  sessionStorage.removeItem('gh-pages-redirect')
  window.history.replaceState(null, '', `${basename}${redirectPath}`)
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
