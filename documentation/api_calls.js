/*
 * This file is used for documentation of all the api calls made by this React-Redux Application
 */

route1 = "/api/v1/use_bp/:user"; // Every business process, the :user is allowed to USE
route2 = "/api/v1/manage_bp/:user"; // Every business process, the :user is allowed to MANAGE
// Get a list of all business processes for that user (both routes return the same structure, but possibly different
// processes
// The response has the form of normalized json, which makes state handling much simpler and more efficient
// Every service that is in use by one of the processes is only sent once inside the "services" part, and referenced
// by its ID inside the process. This makes the json smaller, also this way there is only a single source for each
// service or process, no duplication of information
// If the user has no processes to manage or use, both processes and services should be empty objects: {}
response = {
    processes: {
        "process_1": {
            "id": "process_1",
            "name": "Human readable name of business process",
            "description": "Human readable description of process",
            "services": [
                "serviceA", "serviceB", "serviceC"
            ]
        }
        // Additional processes follow the same structure of "id": { ... }
    },
    services: {
        "serviceA": {
            "id": "serviceA",
            "name": "Human readable name of service",
            "description": "Human readable description of service"
        },
        // Additional services follow the same structure of "id": { ... }
    }
};

route3 = "/api/v1/use_bp/:id/:user?monitor=true|false"; // Get a specific business process as a user to use
responseSuccess = {
    "process": {
        "process_1": {
            "id": "process_1",
            "name": "Human readable name of business process",
            "description": "Human readable description of process",
            "services": [
                "serviceA", "serviceB", "serviceC"
            ],
            "monitoringData": {
                // If monitor parameter is true, this is not empty
            }
        }
    },
    "services": {
        "serviceA": {
            "id": "serviceA",
            "name": "Human readable name of service",
            "description": "Human readable description of service"
        },
        // Additional services follow the same structure of "id": { ... }
    }
};
// If the user is not allowed to use the process, this is returned instead
responseError = {
    "process": null,
    "services": {}
};


route4 = "/api/v1/manage_bp/:id/:user?monitor=true|false"; // Get a specific business process as a user to manage
// This route is also used to get the monitoring data for the process
responseSuccess = {
    "process": {
        "process_1": {
            "id": "process_1",
            "name": "Human readable name of business process",
            "description": "Human readable description of process",
            "services": [
                "serviceA", "serviceB", "serviceC"
            ],
            "monitoringData": {
                // If monitor parameter is true, this is not empty
            }
        }
    },
    "services": {
        "serviceA": {
            "id": "serviceA",
            "name": "Human readable name of service",
            "description": "Human readable description of service"
        },
        // Additional services follow the same structure of "id": { ... }
    }
};
// If the user is not allowed to manage the process, this is returned instead
responseError = {
    "process": null,
    "services": {}
};


route5 = "/api/v1/services/:user?monitor=true|false"; // Every service the :user is allowed to manage
// If there are no services for the user, return an empty object: {} for "services"
response = {
    "services": {
        "serviceA": {
            "id": "serviceA",
            "name": "Human readable name of service",
            "description": "Human readable description of service"
        },
        // Additional services follow the same structure of "id": { ... }
    },
    "monitoringData": {
        // If the "monitor" parameter is true, this is not empty and filled with data
    }
};

route6 = "/api/v1/services/:id/:user?monitor=true|false"; // Get a specific service for the :user to manage
responseSuccess = {
    "service": {
        "serviceA": {
            "id": "serviceA",
            "name": "Human readable name of service",
            "description": "Human readable description of service",
            "monitoringData": {
                // If the monitor parameter is true, this is not empty
            }
        }
    }
};
responseError = {
    "service": null
};

// TODO: Routes for ...
// 1. Start a business process
// 2. Get monitoring data for ...
//    a. all my USED processes
//    b. all my MANAGED processes
//    c. a specific managed process