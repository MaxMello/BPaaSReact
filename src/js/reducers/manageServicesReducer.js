import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const manageServices = {
    "services": ["service1", "service2"],
    "status": FETCH_STATUS.FETCH_SUCCESS
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
            return {...state, "services": Object.keys(action.payload.services), "status": FETCH_STATUS.FETCH_SUCCESS};
        }
        case ACTIONS.MANAGE_SERVICES_FETCH_ERROR: {
            return {...state, "status": FETCH_STATUS.FETCH_ERROR};
        }
    }
    return state;
}
