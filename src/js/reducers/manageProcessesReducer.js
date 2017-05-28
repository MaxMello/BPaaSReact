import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const manageProcesses = {
    "processes": [],
    "status": FETCH_STATUS.NOT_FETCHING,
    "activeProcess": {
        "processID": null,
        "fetchStatus": FETCH_STATUS.NOT_FETCHING,
        "saveStatus": FETCH_STATUS.NOT_FETCHING
    }
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
            return {...state, "processes": action.payload.map(e => e.id), "status": FETCH_STATUS.FETCH_SUCCESS};
        }
        case ACTIONS.MANAGE_PROCESSES_FETCH_ERROR: {
            return {...state, "status": FETCH_STATUS.FETCH_ERROR};
        }
        case ACTIONS.MANAGE_PROCESS_FETCH_REQUEST: {
            return {...state, "activeProcess": {...state.activeProcess, "fetchStatus": FETCH_STATUS.FETCHING}}
        }
        case ACTIONS.MANAGE_PROCESS_FETCH_SUCCESS: {
            return {...state, "activeProcess": {...state.activeProcess, "fetchStatus": FETCH_STATUS.FETCH_SUCCESS,
                    "processID": action.payload.id}}
        }
        case ACTIONS.MANAGE_PROCESS_FETCH_ERROR: {
            return {...state, "activeProcess": {...state.activeProcess, "fetchStatus": FETCH_STATUS.FETCH_ERROR}}
        }
        case ACTIONS.MANAGE_PROCESSES_WRITE_REQUEST: {
            return {...state, "activeProcess": {...state.activeProcess, "saveStatus": FETCH_STATUS.FETCHING}}
        }
        case ACTIONS.MANAGE_PROCESSES_WRITE_SUCCESS: {
            return {...state, "activeProcess": {...state.activeProcess, "saveStatus": FETCH_STATUS.FETCH_SUCCESS}}
        }
        case ACTIONS.MANAGE_PROCESSES_WRITE_ERROR: {
            return {...state, "activeProcess": {...state.activeProcess, "saveStatus": FETCH_STATUS.FETCH_ERROR}}
        }
    }
    return state;
}
