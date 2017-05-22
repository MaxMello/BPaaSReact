import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const manageProcesses = {
    "processes": ["process1"],
    "status": FETCH_STATUS.FETCH_SUCCESS
};

export default function reducer(state=manageProcesses, action) {
    switch(action.type){
        case ACTIONS.USER_LOGOUT: {
            return Object.assign({}, manageProcesses); // Reset the data to the default value
        }
        case ACTIONS.MANAGE_PROCESSES_FETCH_REQUEST: {
            return {...state, "status": FETCH_STATUS.FETCHING};
        }
        case ACTIONS.MANAGE_PROCESSES_FETCH_SUCCESS: {
            // The actual process data gets saved in the processes reducer, here only the keys are saved
            // Old list of processes gets overridden
            return {...state, "processes": Object.keys(action.payload.processes), "status": FETCH_STATUS.FETCH_SUCCESS};
        }
        case ACTIONS.MANAGE_PROCESSES_FETCH_ERROR: {
            return {...state, "status": FETCH_STATUS.FETCH_ERROR};
        }
    }
    return state;
}
