import { queryProcessInstance } from "./useProcessesActions";
import { ACTIONS } from "../constants/constants";
import { call, put, takeEvery, takeLatest, fork, take, race} from 'redux-saga/effects'
import store from "../main";

function delay(millis) {
    return new Promise(resolve => {
        console.log("Waiting to poll again..:");
        setTimeout(() => resolve(true), millis);
    });
}

function* pollProcessInstance() {
    try {
        const state = store.getState();
        console.log("PollProcessInstance - following data should exist");
        console.log(state);
        const user = state.user.userData.name;
        const processID = state.useProcesses.activeProcess.processID;
        const instanceID = state.useProcesses.activeProcess.instance.instanceID;
        console.log("UserName: " + user);
        console.log("ProcessID: " + processID);
        console.log("InstanceID: " + instanceID);
        console.log("Wait 5 seconds, then call queryProcessInstance");
        yield call(delay, 5000);
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
    console.log("ROOT SAGA");
    try {
        yield [
            fork(watchPollData)
        ];
    } catch(error){
        console.log("Root Saga Error");
        console.log(error);
    }
}