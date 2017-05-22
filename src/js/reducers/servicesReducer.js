import { ACTIONS } from "../constants/constants";

const services = {
    "service1": {
        "id": "service1",
        "name": "Service 1",
        "description": "...",
        "baseURL": "https://google.com"
    },
    "service2": {
        "id": "service2",
        "name": "Service 2",
        "description": ".....",
        "baseURL": "https://google.de"
    }
};

export default function reducer(state=services, action) {
    switch(action.type){
        case ACTIONS.USER_LOGOUT: {
            return Object.assign({}, services); // Reset the data to the default value
        }
        case ACTIONS.MANAGE_PROCESSES_FETCH_SUCCESS:
        case ACTIONS.USE_PROCESSES_FETCH_SUCCESS:
        case ACTIONS.MANAGE_SERVICES_FETCH_SUCCESS: {
            // TODO Assumes services to be an object of objects
            return {...state, ...action.payload.services}; // This syntax should override old process information
        }
    }
    return state;
}
