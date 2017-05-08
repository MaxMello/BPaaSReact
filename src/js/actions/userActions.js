import { USER_STATUS, USER_ACTIONS } from "../constants/constants";


export function login(name){
    console.log("Login!");
    return {
        type: USER_ACTIONS.LOGIN,
        payload: {
            "status": USER_STATUS.EXISTS,
            "userData": {
                "name": name
            }
        }
    }
}

export function logout(){
    return {
        type: USER_ACTIONS.LOGOUT,
        payload: {
            "status": USER_STATUS.NO_USER,
            "userData": {}
        }
    }
}