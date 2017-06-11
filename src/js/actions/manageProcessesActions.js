import { ROUTES } from '../constants/routes'
import { ACTIONS, GET_REQUEST, PUT_REQUEST } from '../constants/constants';

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
    return fetch(ROUTES.businessProcesses(), GET_REQUEST())
        .then( response => Promise.all([response, response.json()]));
}

function fetchProcessesRequest(){
    return {
        type: ACTIONS.MANAGE_PROCESSES_FETCH_REQUEST
    }
}

function fetchProcessesSuccess(payload) {
    return {
        type: ACTIONS.MANAGE_PROCESSES_FETCH_SUCCESS,
        payload
    }
}

function fetchProcessesError() {
    return {
        type: ACTIONS.MANAGE_PROCESSES_FETCH_ERROR
    }
}

/*
 * Actions and functions for single process page
 */

export function loadProcess(id) {
    return (dispatch) => {
        dispatch(fetchProcessRequest());
        return fetchProcess(id).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchProcessSuccess(json))
            } else{
                dispatch(fetchProcessError())
            }
        }).catch( error => dispatch(fetchProcessError()));
    }
}

function fetchProcess(id) {
    return fetch(ROUTES.businessProcess(id), GET_REQUEST())
        .then( response => Promise.all([response, response.json()]));
}

function fetchProcessRequest(){
    return {
        type: ACTIONS.MANAGE_PROCESS_FETCH_REQUEST
    }
}

function fetchProcessSuccess(payload) {
    return {
        type: ACTIONS.MANAGE_PROCESS_FETCH_SUCCESS,
        payload
    }
}

function fetchProcessError() {
    return {
        type: ACTIONS.MANAGE_PROCESS_FETCH_ERROR
    }
}

// Write process

export function changeProcess(processData) {
    return {
        type: ACTIONS.MANAGE_PROCESSES_CHANGE_PROCESS,
        payload: processData
    }
}

export function writeProcess(process) {
    return (dispatch) => {
        dispatch(fetchProcessRequest());
        return postProcess(process).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchProcessSuccess(json))
            } else{
                dispatch(fetchProcessError())
            }
        }).catch( error => dispatch(fetchProcessError()));
    }
}

function postProcess(process) {
    return fetch(ROUTES.businessProcesses(), PUT_REQUEST(process))
        .then( response => Promise.all([response, response.json()]));
}

function writeProcessRequest(){
    return {
        type: ACTIONS.MANAGE_PROCESSES_WRITE_REQUEST
    }
}

function writeProcessSuccess(payload) {
    return {
        type: ACTIONS.MANAGE_PROCESSES_WRITE_SUCCESS,
        payload
    }
}

function writeProcessError() {
    return {
        type: ACTIONS.MANAGE_PROCESSES_WRITE_ERROR
    }
}