import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

//redux
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./redux/reducer.js";

//configure le store Redux avec le rootReducer
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);
