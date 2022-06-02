import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

let intervalId = setInterval(() => {
  clearInterval(intervalId);
  if (typeof Editor !== "undefined" && typeof require !== "undefined") {
    import("./App").then(({ default: App }) => {
      Editor.Ipc.sendToAll("plugin-ready");
      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    });
  } else {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
});
