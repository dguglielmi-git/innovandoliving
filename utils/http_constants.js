/**
 * HTTP Response Code List
 */

/** @description 200 OK: The request has succeeded. The server has successfully processed
  the request and is returning the requested resource. */
export const SUCCESSFUL_HTTP_REQUEST = 200;
/** @description  201 Created: The request has been fulfilled, and a new resource has been
  created as a result.*/
export const HTTP_REQUEST_OK_CREATED = 201;
/** @description  202 Accepted: The request has been accepted for processing, but the processing 
 is not yet complete. This status code is typically used for asynchronous operations.*/
export const HTTP_REQUEST_OK_ACCEPTED = 202;
/** @description  204 No Content: The server has successfully processed the request, but there 
 is no content to return. This is commonly used for requests that don't require a response body.*/
export const HTTP_REQUEST_OK_NO_CONTENT = 204;

/** @description 400 Bad Request: Invalid or malformed request. */
export const HTTP_BAD_REQUEST = 400;
/** @description 401 Unauthorized: Authentication is required or invalid credentials provided. */
export const HTTP_UNAUTHORIZED = 401;
/** @description 403 Forbidden: Access to the requested resource is denied.*/
export const HTTP_FORBIDDEN = 403;
/** @description 404 Not Found: The requested resource could not be found. */
export const HTTP_NOT_FOUND = 404;

/** @description 500 Internal Server Error: An unexpected error occurred on the server. */
export const INTERNAL_SERVER_ERROR = 500;
