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
        case ACTIONS.MANAGE_SERVICES_FETCH_SUCCESS: {
            const serverResponse = action.payload;
            const newServices = {};
            serverResponse.forEach(e => newServices[e.id] = {
                "id": e.id,
                "name": e.name,
                "description": e.description,
                "baseURL": e.baseURL
            });
            return {...state, ...newServices};
        }
        case ACTIONS.MANAGE_SERVICES_WRITE_SUCCESS:
        case ACTIONS.MANAGE_SERVICE_FETCH_SUCCESS: {
            const newState = Object.assign({}, state);
            newState[action.payload.id] = action.payload;
            return newState;
        }
    }
    return state;
}
