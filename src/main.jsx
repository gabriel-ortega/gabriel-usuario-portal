import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from "./config/i18next.config.js";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
