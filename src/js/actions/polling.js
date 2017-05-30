import { queryProcessInstance } from "./useProcessesActions";
import { ACTIONS } from "../constants/constants";

function delay(millis) {
    return new Promise(resolve => {
        console.log("Waiting to poll again..:");
        setTimeout(() => resolve(true), millis);
    });
}

function* pollProcessInstance(user, processID, instanceI) {
    try {
        yield call(delay, 5000);
        yield put(queryProcessInstance(user, processID, instanceI));
    } catch (error) {
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
    yield [
        fork(watchPollData)
    ];
}