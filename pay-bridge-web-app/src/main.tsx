import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Container/App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css"
import { Provider } from "react-redux";
import { store } from "./Storage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ToastContainer></ToastContainer>
        <App></App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
