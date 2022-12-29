import React from "react"
import ReactDOM from "react-dom"

import DataProvider from "./redux/store"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import "./styles/global.css"

ReactDOM.render(
  <React.StrictMode>
    {console.log('I render 😡')}
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
