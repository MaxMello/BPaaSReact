import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const manageServices = {
    "services": [],
    "status": FETCH_STATUS.NOT_FETCHING,
    "activeService": {
        "fetchStatus": FETCH_STATUS.NOT_FETCHING,
        "saveStatus": FETCH_STATUS.NOT_FETCHING,
        "serviceData": {
            "id": "",
            "name": "",
            "description": "",
            "baseURL": ""
        }
    }
};

export default function reducer(state=manageServices, action) {
    switch(action.type){
        case ACTIONS.USER_LOGOUT: {
            return Object.assign({}, manageServices); // Reset the data to the default value
        }
        case ACTIONS.MANAGE_SERVICES_FETCH_REQUEST: {
            return {...state, "status": FETCH_STATUS.FETCHING};
        }
        case ACTIONS.MANAGE_SERVICES_FETCH_SUCCESS: {
            // The actual process data gets saved in the processes reducer, here only the keys are saved
            // Old list of processes gets overridden
            return {...state, "services": action.payload.map(e => e.id), "status": FETCH_STATUS.FETCH_SUCCESS};
        }
        case ACTIONS.MANAGE_SERVICES_FETCH_ERROR: {
            return {...state, "status": FETCH_STATUS.FETCH_ERROR};
        }
        case ACTIONS.MANAGE_SERVICE_FETCH_REQUEST: {
            return {...state, "activeService": {...state.activeService, fetchStatus: FETCH_STATUS.FETCHING}}
        }
        case ACTIONS.MANAGE_SERVICE_FETCH_SUCCESS: {
            return {...state, "activeService": {...state.activeService, fetchStatus: FETCH_STATUS.FETCH_SUCCESS,
                                                serviceID: action.payload.id}}
        }
        case ACTIONS.MANAGE_SERVICE_FETCH_ERROR: {
            return {...state, "activeService": {...state.activeService, fetchStatus: FETCH_STATUS.FETCH_ERROR}}
        }
        case ACTIONS.MANAGE_SERVICES_WRITE_REQUEST: {
            return {...state, "activeService": {...state.activeService, saveStatus: FETCH_STATUS.FETCHING}}
        }
        case ACTIONS.MANAGE_SERVICES_WRITE_SUCCESS:{
            return {...state, "activeService": {...state.activeService, saveStatus: FETCH_STATUS.FETCH_SUCCESS}}
        }
        case ACTIONS.MANAGE_SERVICES_WRITE_ERROR: {
            return {...state, "activeService": {...state.activeService, fetchStatus: FETCH_STATUS.FETCH_ERROR}}
        }
        case ACTIONS.MANAGE_SERVICES_CHANGE_SERVICE: {
            return {...state, "activeService": {...state.activeService, serviceData: action.payload}}
        }
    }
    return state;
}
