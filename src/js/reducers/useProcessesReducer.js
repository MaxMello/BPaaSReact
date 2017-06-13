import { ACTIONS, FETCH_STATUS } from "../constants/constants";

const useProcesses = {
    "processes": [],
    "status": FETCH_STATUS.NOT_FETCHING,
    "activeProcess": {
        "status": FETCH_STATUS.NOT_FETCHING,
        "processID": null,
        "instance": null
    },
    "billing": {
        "status": FETCH_STATUS.NOT_FETCHING,
        "priceToPay": 0.00
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
            return {...state, "processes": action.payload.map(e => e.id), "status": FETCH_STATUS.FETCH_SUCCESS};
        }
        case ACTIONS.USE_PROCESSES_FETCH_ERROR: {
            return {...state, "status": FETCH_STATUS.FETCH_ERROR};
        }
        case ACTIONS.USE_PROCESS_USE_REQUEST: {
            return {...state, "activeProcess": {...state.activeProcess, "status": FETCH_STATUS.FETCHING,
                                                "processID": action.payload.id}};
        }
        case ACTIONS.USE_PROCESS_USE_SUCCESS: {
            return {...state, "activeProcess": {...state.activeProcess, "status": FETCH_STATUS.FETCH_SUCCESS,
                                                 "instance": {
                                                    "status": FETCH_STATUS.NOT_FETCHING,
                                                    "instanceID": action.payload.instanceID,
                                                    "gui": null
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
            let newGUI = action.payload.gui;
            if(state.activeProcess.instance.gui === null && newGUI === ""){
                // If the initial state (null) is still active and the given new GUI URL is empty string,
                // That means there is not yet a gui to show, so don't change the GUI url
                    newGUI = null;
            }
            return {...state, "activeProcess": {...state.activeProcess, "instance": {...state.activeProcess.instance,
                "status": FETCH_STATUS.FETCH_SUCCESS,
                "gui": newGUI
            }}};
        }
        case ACTIONS.USE_PROCESS_INSTANCE_ERROR: {
            return {...state, "activeProcess": {...state.activeProcess, "instance": {...state.activeProcess.instance,
                "status": FETCH_STATUS.FETCH_ERROR
            }}};
        }
        case ACTIONS.BILLING_REQUEST: {
            return {...state, "billing": {...state.billing, "status": FETCH_STATUS.FETCHING}}
        }
        case ACTIONS.BILLING_SUCCESS: {
            return {...state, "billing": {...state.billing, "status": FETCH_STATUS.FETCH_SUCCESS,
                "priceToPay": action.payload.priceToPay}}
        }
        case ACTIONS.BILLING_ERROR: {
            return {...state, "billing": {...state.billing, "status": FETCH_STATUS.FETCH_ERROR}}
        }
    }
    return state;
}
