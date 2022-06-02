import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

let intervalId = setInterval(() => {
  clearInterval(intervalId);
  if (typeof Editor !== "undefined" && typeof require !== "undefined") {
    import("./App").then(({ default: App }) => {
      Editor.Ipc.sendToAll("plugin-ready");
      const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
      );
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    });
  } else {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



