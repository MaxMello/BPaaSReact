export function login(name, password){
    console.log("Login!");
    return {
        type: "LOGIN",
        payload: {
            "id": 1,
            "name": name,
            "organisation": "HAW Hamburg",
            "groups": [
                "PROCESS_USER", "PROCESS_PROVIDER", "SERVICE_PROVIDER"
            ]
        }
    }
}

export function signIn(name, organisation, password){
    return {
        type: "SIGN_IN",
        payload: {
            "id": 1,
            "name": name,
            "organisation": organisation,
            "groups": [
                "PROCESS_USER", "PROCESS_PROVIDER", "SERVICE_PROVIDER"
            ]
        }
    }
}

export function logout(){
    return {
        type: "LOGOUT",
        payload: {
            "success": true
        }
    }
}