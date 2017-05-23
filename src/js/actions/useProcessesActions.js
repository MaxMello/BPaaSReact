import { ROUTES } from '../constants/routes';
import { ACTIONS } from '../constants/constants';

/*
 * Actions and functions for process overview page
 */

export function loadProcesses(user) {
    return (dispatch) => {
        dispatch(fetchProcessesRequest());
        return fetchProcesses(user).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchProcessesSuccess(json))
            } else{
                dispatch(fetchProcessesError())
            }
        }).catch( error => dispatch(fetchProcessesError()));
    }
}

function fetchProcesses(user) {
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
        type: ACTIONS.USE_PROCESSES_FETCH_REQUEST,
        payload
    }
}

function fetchProcessesError() {
    return {
        type: ACTIONS.USE_PROCESSES_FETCH_ERROR
    }
}

/*
 * Actions and functions for single process page
 */

export function loadProcess(id, user) {
    return (dispatch) => {
        dispatch(fetchProcessRequest());
        return fetchProcess(id, user).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchProcessSuccess(json))
            } else{
                dispatch(fetchProcessError())
            }
        }).catch( error => dispatch(fetchProcessError()));
    }
}

function fetchProcess(id, user) {
    return fetch(ROUTES.businessProcess(id), { method: 'GET' }).then( response => Promise.all([response, response.json()]));
}

function fetchProcessRequest(id){
    return {
        type: ACTIONS.USE_PROCESS_FETCH_REQUEST,
        payload: {
            id
        }
    }
}

function fetchProcessSuccess(payload) {
    return {
        type: ACTIONS.USE_PROCESS_FETCH_REQUEST,
        payload
    }
}

function fetchProcessError() {
    return {
        type: ACTIONS.USE_PROCESS_FETCH_ERROR
    }
}