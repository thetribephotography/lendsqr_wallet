// All http status and meaning

const STATUS = {
  OK_200: 200,
  CREATED_201: 201,
  ACCPTED_202: 202,
  NO_CONTENT_204: 204,
  RESET_CONTENT_205: 205,
  NOT_MODIFIED_304: 304,
  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,
  METHOD_NOT_ALLOWED_405: 405,
  REQUEST_TIMEOUT_408: 408,
  CONFLICT_409: 409,
  UNAVALIABLE_410: 410,
  UNSUPPORTED_MEIDA_TYPE_415: 415,
  TOO_MANY_REQ_429: 429,
  INVALID_TOKEN_498: 498,
  MISSING_TOKEN_499: 499,
  SERVER_ERR_500: 500,
  SERVICE_UNAVALIABLE_503: 503,
};


module.exports = STATUS;

// export default STATUS;

// export const getStatusText = (statusCode: number): string => {
//     switch (statusCode) {
//         case 200:
//             return "OK";
//         case 201:
//             return "Created";
//         case 202:
//             return "Accepted";
//         case 204:
//             return "No Content";
//         case 205:
//             return "Reset Content";
//         case 304:
//             return "Not Modified";
//         case 400:
//             return "Bad Request";
//         case 401:
//                 return "Unauthorized";
//         case 403:
//             return "Forbidden";
//         case 404:
//             return "Not Found";
//         case 405:
//             return "Method Not Allowed";
//         case 408:
//             return "Request Timeout";
//         case 409:
//             return "Conflict";
//         case 410:
//             return "Gone";
//         case 415:
//             return "Unsupported Media Type";
//         case 429:
//             return "Too Many Requests";
//         case 498:
//             return "Invalid Token";
//         case 499:
//             return "Missing Token";
//         case 500:
//             return "Internal Server Error";
//         case 503:
//             return "Service Unavailable";
//         default:
//             return "Unknown Status";
//     }
// };
