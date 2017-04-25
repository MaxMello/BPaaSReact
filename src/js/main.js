import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./components/AppWrapper";
import store from "./store";
import { Provider } from "react-redux";

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <AppWrapper/>
    </Provider>, app);