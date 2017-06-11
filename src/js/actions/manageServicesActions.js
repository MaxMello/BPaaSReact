import { ROUTES } from '../constants/routes';
import { ACTIONS, GET_REQUEST, POST_REQUEST } from '../constants/constants';

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
    return fetch(ROUTES.services(), GET_REQUEST())
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
        dispatch(() => { return { type: ACTIONS.MANAGE_SERVICE_FETCH_REQUEST } });
        return fetch(ROUTES.service(id), GET_REQUEST())
                .then(response => Promise.all([response, response.json()]))
                .then(([response, payload]) => {
            if(response.status === 200){
                dispatch(() => {return { type: ACTIONS.MANAGE_SERVICE_FETCH_SUCCESS, payload}})
            } else{
                dispatch(() => {return {type: ACTIONS.MANAGE_SERVICE_FETCH_ERROR}})
            }
        }).catch( error => dispatch(() => { return { type: ACTIONS.MANAGE_SERVICE_FETCH_ERROR } }));
    };
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
    return fetch(ROUTES.services(), POST_REQUEST(service))
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