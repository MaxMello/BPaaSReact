import { ROUTES } from '../constants/routes'

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
        type: "FETCH_REQUEST"
    }
}

function fetchProcessesSuccess(payload) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchProcessesError() {
    return {
        type: "FETCH_ERROR"
    }
}

/*
 * Actions and functions for single process page
 */