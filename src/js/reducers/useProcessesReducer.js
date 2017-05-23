import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const useProcesses = {
    "processes": ["process1"], // TODO: Initial state empty array
    "status": FETCH_STATUS.FETCH_SUCCESS, //TODO Initial state to NOT_FETCHING
    "activeProcess": {
        "status": FETCH_STATUS.NOT_FETCHING,
        "process": null
    }
};

export default function reducer(state=useProcesses, action) {
    switch (action.type) {
        case ACTIONS.USER_LOGOUT: {
            return Object.assign({}, useProcesses); // Reset the data to the default value
        }
        case ACTIONS.USE_PROCESSES_FETCH_REQUEST: {
            return {...state, "status": FETCH_STATUS.FETCHING};
        }
        case ACTIONS.USE_PROCESSES_FETCH_SUCCESS: {
            // The actual process data gets saved in the processes reducer, here only the keys are saved
            return {...state, "processes": Object.keys(action.payload.processes), "status": FETCH_STATUS.FETCH_SUCCESS};
        }
        case ACTIONS.USE_PROCESSES_FETCH_ERROR: {
            return {...state, "status": FETCH_STATUS.FETCH_ERROR};
        }
        case ACTIONS.USE_PROCESS_FETCH_REQUEST: {
            return {...state, "activeProcess": {"status": FETCH_STATUS.FETCHING,
                                                "process": action.payload.id}};
        }
        case ACTIONS.USE_PROCESS_FETCH_SUCCESS: {
            // The actual process data gets saved in the processes reducer, here only the keys are saved
            return {...state, "activeProcess": { "status": FETCH_STATUS.FETCH_SUCCESS,
                                                 "process": action.payload.id}
                   };
        }
        case ACTIONS.USE_PROCESS_FETCH_ERROR: {
            return {...state, "activeProcess": { "status": FETCH_STATUS.FETCH_ERROR}};
        }
    }
    return state;
}
