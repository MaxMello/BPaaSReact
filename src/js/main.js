//React imports
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

//Redux imports
import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import "babel-polyfill";
import "babel-core/register";
import createSagaMiddleware from 'redux-saga';

//Imports for connecting React and Redux
import { Provider } from "react-redux";

//Project imports
import { Home, Login, UseProcess, UseProcesses, ManageProcesses, EditProcess, Services, EditService, MyBilling} from './pages';
import App from './components/App';
import rootSaga from "./actions/polling";
//Reducers
import user from "./reducers/userReducer";
import useProcesses from "./reducers/useProcessesReducer";
import processes from "./reducers/processesReducer";
import services from "./reducers/servicesReducer";
import manageProcesses from "./reducers/manageProcessesReducer";
import manageServices from "./reducers/manageServicesReducer";

const sagaMiddleware = createSagaMiddleware();
const app = document.getElementById('app');
const store = createStore(
    combineReducers({user, processes, useProcesses, manageProcesses, services, manageServices}),
    applyMiddleware(promise(), thunk, logger(), sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/login" name="login" component={Login}/>
                <Route path="/my-processes" name="my-processes" component={UseProcesses}/>
                <Route path="/my-processes/use/:id" name="use-process" component={UseProcess}/>
                <Route path="/my-billing" name="my-billing" component={MyBilling}/>
                <Route path="/processes" name="manage-processes" component={ManageProcesses}/>
                <Route path="/processes/edit/(:id)" name="edit-process" component={EditProcess}/>
                <Route path="/services" name="services" component={Services}/>
                <Route path="/services/edit/(:id)" name="edit-service" component={EditService}/>
            </Route>
        </Router>
    </Provider>, app);

export default store;
