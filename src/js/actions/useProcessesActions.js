import { ROUTES } from '../constants/routes';
import { ACTIONS } from '../constants/constants';

/*
 * Actions and functions for process overview page
 */

export function loadProcesses() {
    return (dispatch) => {
        dispatch(fetchProcessesRequest());
        return fetchProcesses().then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchProcessesSuccess(json))
            } else{
                dispatch(fetchProcessesError())
            }
        }).catch( error => dispatch(fetchProcessesError()));
    }
}

function fetchProcesses() {
    return fetch(ROUTES.businessProcesses(), { method: 'GET' })
            .then( response => Promise.all([response, response.json()]));
}

function fetchProcessesRequest(){
    return {
        type: ACTIONS.USE_PROCESSES_FETCH_REQUEST
    }
}

function fetchProcessesSuccess(payload) {
    return {
        type: ACTIONS.USE_PROCESSES_FETCH_SUCCESS,
        payload
    }
}

function fetchProcessesError() {
    return {
        type: ACTIONS.USE_PROCESSES_FETCH_ERROR
    }
}

/*
 * Get instance for user and process to use
 */

export function useProcess(user, id) {
    return (dispatch) => {
        dispatch(fetchProcessRequest());
        return fetchProcess(user, id).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchProcessSuccess(json))
            } else{
                dispatch(fetchProcessError())
            }
        }).catch( error => dispatch(fetchProcessError()));
    }
}

function fetchProcess(user, id) {
    return fetch(ROUTES.startProcess(user, id), { method: 'GET' }).then( response => Promise.all([response, response.json()]));
}

function fetchProcessRequest(id){
    return {
        type: ACTIONS.USE_PROCESS_USE_REQUEST,
        payload: {
            id
        }
    }
}

function fetchProcessSuccess(payload) {
    return {
        type: ACTIONS.USE_PROCESS_USE_SUCCESS,
        payload
    }
}

function fetchProcessError() {
    return {
        type: ACTIONS.USE_PROCESS_USE_ERROR
    }
}

// Instance

export function queryProcessInstance(user, processID, instanceID) {
    return (dispatch) => {
        dispatch(getInstanceRequest());
        return fetchInstance(user, processID, instanceID).then(([response, json]) => {
            if(response.status === 200){
                dispatch(getInstanceSuccess(json))
            } else{
                dispatch(getInstanceError())
            }
        }).catch( error => dispatch(getInstanceError()));
    }
}

function fetchInstance(user, processID, instanceID) {
    return fetch(ROUTES.processInstance(user, processID, instanceID), { method: 'GET' })
        .then( response => Promise.all([response, response.json()]));
}

function getInstanceRequest(id){
    return {
        type: ACTIONS.USE_PROCESS_INSTANCE_REQUEST,
        payload: {
            id
        }
    }
}

function getInstanceSuccess(payload) {
    return {
        type: ACTIONS.USE_PROCESS_INSTANCE_SUCCESS,
        payload
    }
}

function getInstanceError() {
    return {
        type: ACTIONS.USE_PROCESS_INSTANCE_ERROR
    }
}


// Billing

export function billing(user) {
    return (dispatch) => {
        dispatch(billingRequest());
        return getBilling(user).then(([response, json]) => {
            if(response.status === 200){
                dispatch(billingSuccess(json))
            } else{
                dispatch(billingError())
            }
        }).catch( error => dispatch(billingError()));
    }
}

function getBilling(user) {
    return fetch(ROUTES.billing(user), { method: 'GET' })
        .then( response => Promise.all([response, response.json()]));
}

function billingRequest(){
    return {
        type: ACTIONS.BILLING_REQUEST
    }
}

function billingSuccess(payload) {
    return {
        type: ACTIONS.BILLING_SUCCESS,
        payload
    }
}

function billingError() {
    return {
        type: ACTIONS.BILLING_ERROR
    }
}