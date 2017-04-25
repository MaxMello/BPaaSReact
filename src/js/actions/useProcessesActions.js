export function loadProcesses(isLoading){
    return {
        type: "LOAD_PROCESSES",
        payload: {
            "processes": [
                {
                    "id": 1,
                    "name": "Rechnung erstellen"
                },
                {
                    "id": 2,
                    "name": "Artikel inventarisieren"
                }
            ],
            "loading": !isLoading
        }
    }

};