import { ROUTES } from '../constants/routes'

/*
 * Actions and functions for process overview page
 */

export function loadServices(user) {
    return (dispatch) => {
        dispatch(fetchServicesRequest());
        return fetchServices(user).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchServicesSuccess(json))
            } else{
                dispatch(fetchServicesError())
            }
        }).catch( error => dispatch(fetchServicesError()));
    }
}

function fetchServices(user) {
    return fetch(ROUTES.services(), { method: 'GET' })
        .then( response => Promise.all([response, response.json()]));
}

function fetchServicesRequest(){
    return {
        type: "FETCH_REQUEST"
    }
}

function fetchServicesSuccess(payload) {
    return {
        type: "FETCH_SUCCESS",
        payload
    }
}

function fetchServicesError() {
    return {
        type: "FETCH_ERROR"
    }
}

/*
 * Actions and functions for single process page
 */