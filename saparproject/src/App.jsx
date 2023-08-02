import React from "react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

import { store } from "./store";
import Router from "./Router";

import "./styles/main.scss";

function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
