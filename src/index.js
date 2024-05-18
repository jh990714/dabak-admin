/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import CustomizedTables from "layouts/tables/reviewTable/basicTable";
import store from "reducers/store";
import { fetchProducts } from "reducers/slices/productSlice";
import { fetchMembers } from "reducers/slices/memberSlice";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = createRoot(container);

store.dispatch(fetchProducts());
store.dispatch(fetchMembers());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>
);
