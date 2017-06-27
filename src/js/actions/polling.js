import { queryProcessInstance } from "./useProcessesActions";
import { ACTIONS } from "../constants/constants";
import { call, put, fork, take, race} from 'redux-saga/effects'
import store from "../main";

function delay(millis) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), millis);
    });
}

function* pollProcessInstance() {
    try {
        const state = store.getState();
        const user = state.user.userData.name;
        const processID = state.useProcesses.activeProcess.processID;
        const instanceID = state.useProcesses.activeProcess.instance.instanceID;
        if(user === undefined || processID === undefined || instanceID === undefined){
            console.log("Data for polling is missing!");
            return;
        }
        console.log("Wait 5 seconds, then call queryProcessInstance");
        yield call(delay, 1500);
        console.log("Calling queryProcessInstance");
        yield put(queryProcessInstance(user, processID, instanceID));
    } catch (error) {
        console.log("Polling error");
        console.log(error);
    }
}

function* watchPollData() {
    while (true) {
        yield take(ACTIONS.USE_PROCESS_INSTANCE_SUCCESS); // If Polling is success, trigger
        yield race({
            response: call(pollProcessInstance),
            cancel: take(ACTIONS.USE_PROCESS_INSTANCE_ERROR) // Stop if error (means instance finished)
        });
    }
}

export default function* rootSaga() {
    try {
        yield [
            fork(watchPollData)
        ];
    } catch(error){
        console.log("Root Saga Error");
        console.log(error);
    }
}