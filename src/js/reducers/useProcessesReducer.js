import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const useProcesses = {
    "processes": ["process1"], // TODO: Initial state empty array
    "status": FETCH_STATUS.FETCH_SUCCESS, //TODO Initial state to NOT_FETCHING
    "activeProcess": {
        "status": FETCH_STATUS.NOT_FETCHING,
        "processID": null,
        "instance": null
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
        case ACTIONS.USE_PROCESS_USE_REQUEST: {
            return {...state, "activeProcess": {...state.activeProcess, "status": FETCH_STATUS.FETCHING,
                                                "processID": action.payload.id}};
        }
        case ACTIONS.USE_PROCESS_USE_SUCCESS: {
            // TODO Correct payload access
            return {...state, "activeProcess": {...state.activeProcess, "status": FETCH_STATUS.FETCH_SUCCESS,
                                                 "instance": {
                                                    "instanceID": action.payload.instanceID
                                                 }}};
        }
        case ACTIONS.USE_PROCESS_USE_ERROR: {
            return {...state, "activeProcess": {...state.activeProcess, "status": FETCH_STATUS.FETCH_ERROR}};
        }
        case ACTIONS.USE_PROCESS_INSTANCE_REQUEST: {
            return {...state, "activeProcess": {...state.activeProcess, "instance": {...state.activeProcess.instance,
                "status": FETCH_STATUS.FETCHING
            }}};
        }
        case ACTIONS.USE_PROCESS_INSTANCE_SUCCESS: {
            //TODO Correct payload access for url
            return {...state, "activeProcess": {...state.activeProcess, "instance": {...state.activeProcess.instance,
                "status": FETCH_STATUS.FETCHING,
                "instanceURL": action.payload.instanceURL
            }}};
        }
        case ACTIONS.USE_PROCESS_INSTANCE_ERROR: {
            return {...state, "activeProcess": {...state.activeProcess, "instance": {...state.activeProcess.instance,
                "status": FETCH_STATUS.FETCH_ERROR
            }}};
        }
    }
    return state;
}
