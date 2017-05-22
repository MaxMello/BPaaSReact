import { ROUTES } from '../constants/routes';
import { ACTIONS } from '../constants/constants';

/*
 * Actions and functions for service overview page
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
        type: ACTIONS.MANAGE_SERVICES_FETCH_REQUEST
    }
}

function fetchServicesSuccess(payload) {
    return {
        type: ACTIONS.MANAGE_SERVICES_FETCH_SUCCESS,
        payload
    }
}

function fetchServicesError() {
    return {
        type: ACTIONS.MANAGE_SERVICES_FETCH_ERROR
    }
}

/*
 * Actions and functions for single service page
 */