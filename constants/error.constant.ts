const ALERTS = require("./alerts.constants")
const STATUS = require("./status.constants");

interface ErrorObject {
    status?: number;
    alert?: string;
    message?: string;
    error?: string;
    result?: any;
}

// export const ERROR: ErrorObject = (error: ErrorObject): ErrorObject => {
//     return {
//         status: error.status || STATUS.SERVER_ERR_500,
//         alert: error.alert || ALERTS.DANGER,
//         ...error,
//         message: error.error ? error.message : "An unknown error occurred",
//         error: error.error || error.message,
//         result: error.result || null,
//     };
// };

export const ERROR: (error: ErrorObject) => ErrorObject = (
    error: ErrorObject
): ErrorObject => {
    return {
        status: error.status || STATUS.SERVER_ERR_500,
        alert: error.alert || ALERTS.DANGER,
        ...error,
        message: error.error ? error.message : "An unknown error occurred",
        error: error.error || error.message,
        result: error.result || null,
    };
};

// export const ERROR: (error: any) => any = (
//     error: any
// ): any => {
//     return {
//         status: error.status || STATUS.SERVER_ERR_500,
//         alert: error.alert || ALERTS.DANGER,
//         ...error,
//         message: error.error ? error.message : "An unknown error occurred",
//         error: error.error || error.message,
//         result: error.result || null,
//     };
// };

export default ERROR;
