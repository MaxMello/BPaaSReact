import { ROUTES } from '../constants/routes';
import { ACTIONS } from '../constants/constants';

/*
 * Actions and functions for service overview page
 */

export function loadServices() {
    return (dispatch) => {
        dispatch(fetchServicesRequest());
        return fetchServices().then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchServicesSuccess(json))
            } else{
                dispatch(fetchServicesError())
            }
        }).catch( error => dispatch(fetchServicesError()));
    }
}

function fetchServices() {
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

export function loadService(id) {
    return (dispatch) => {
        dispatch(fetchServiceRequest());
        return fetchService(id).then(([response, json]) => {
            if(response.status === 200){
                dispatch(fetchServiceSuccess(json))
            } else{
                dispatch(fetchServiceError())
            }
        }).catch( error => dispatch(fetchServiceError()));
    }
}

function fetchService(id) {
    return fetch(ROUTES.service(id), { method: 'GET' })
        .then( response => Promise.all([response, response.json()]));
}

function fetchServiceRequest(){
    return {
        type: ACTIONS.MANAGE_SERVICE_FETCH_REQUEST
    }
}

function fetchServiceSuccess(payload) {
    return {
        type: ACTIONS.MANAGE_SERVICE_FETCH_SUCCESS,
        payload
    }
}

function fetchServiceError() {
    return {
        type: ACTIONS.MANAGE_SERVICE_FETCH_ERROR
    }
}

// Write service

export function writeService(service) {
    return (dispatch) => {
        dispatch(writeServiceRequest());
        return postService(service).then(([response, json]) => {
            if(response.status === 200){
                dispatch(writeServiceSuccess(json))
            } else{
                dispatch(writeServiceError())
            }
        }).catch( error => dispatch(writeServiceError()));
    }
}

function postService(service) {
    return fetch(ROUTES.services(), { method: 'POST', body: service })
        .then( response => Promise.all([response, response.json()]));
}

function writeServiceRequest(){
    return {
        type: ACTIONS.MANAGE_SERVICES_WRITE_REQUEST
    }
}

function writeServiceSuccess(payload) {
    return {
        type: ACTIONS.MANAGE_SERVICES_WRITE_SUCCESS,
        payload
    }
}

function writeServiceError() {
    return {
        type: ACTIONS.MANAGE_SERVICES_WRITE_ERROR
    }
}