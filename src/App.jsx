import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import AppLayout from "./AppLayout";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./store/index";
import "./index.css";

const App = () => (
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <AppLayout />
          <NotificationContainer />
        </Router>
      </Suspense>
    </Provider>
  </StyledEngineProvider>
);
ReactDOM.render(<App />, document.getElementById("app"));
