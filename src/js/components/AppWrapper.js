import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Home, Login,
    UseProcess, UseProcesses,
    ManageProcesses, EditProcess, MonitorProcess,
    Services, EditService, MonitorService} from './../pages';
import App from './App';

export default class AppWrapper extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="/login" name="login" component={Login}/>
                    <Route path="/my-processes"
                           name="my-processes"
                           component={UseProcesses}/>
                    <Route path="/my-processes/use/:id" name="use-process" component={UseProcess}/>
                    <Route path="/processes" name="manage-processes" component={ManageProcesses}/>
                    <Route path="/processes/edit/(:id)" name="edit-process" component={EditProcess}/>
                    <Route path="/processes/monitor/:id" name="monitor-process" component={MonitorProcess}/>
                    <Route path="/services" name="services" component={Services}/>
                    <Route path="/services/edit/(:id)" name="edit-service" component={EditService}/>
                    <Route path="/services/monitor/:id" name="monitor-service" component={MonitorService}/>
                </Route>
            </Router>
        );
    }
}