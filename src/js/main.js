//React imports
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

//Redux imports
import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

//Imports for connecting React and Redux
import { Provider } from "react-redux";

//Project imports
import { Home, Login, UseProcess, UseProcesses, ManageProcesses, EditProcess, MonitorProcess,
         Services, EditService, MonitorService, MyBilling, MonitorProcesses, MonitorServices} from './pages';
import App from './components/App';
//Reducers
import user from "./reducers/userReducer";
import useProcesses from "./reducers/useProcessesReducer";
import processes from "./reducers/processesReducer";
import services from "./reducers/servicesReducer";
import manageProcesses from "./reducers/manageProcessesReducer";
import manageServices from "./reducers/manageServicesReducer";


const app = document.getElementById('app');
const store = createStore(
    combineReducers({user, processes, useProcesses, manageProcesses, services, manageServices}),
    applyMiddleware(promise(), thunk, logger()));
console.log("STORE");
console.log(store);

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
                <Route path="/processes/monitor/" name="monitor-processes" component={MonitorProcesses}/>
                <Route path="/processes/monitor/:id" name="monitor-process" component={MonitorProcess}/>
                <Route path="/services" name="services" component={Services}/>
                <Route path="/services/edit/(:id)" name="edit-service" component={EditService}/>
                <Route path="/services/monitor/" name="monitor-services" component={MonitorServices}/>
                <Route path="/services/monitor/:id" name="monitor-service" component={MonitorService}/>
            </Route>
        </Router>
    </Provider>, app);