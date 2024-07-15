# API Documentation

## Overview

This documentation provides details about the API endpoints, including parameters and response formats.

---

## Endpoints

Ensure to always use `http://localhost:3000/api` as the root endpoint for any kind of request!

| Endpoint    | Method | Params                                                                                                                                                          | Description                   | Response                                                                                                                                                                                                                                                                                                       |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/users`    | GET    | None                                                                                                                                                            | Returns a list of all users    | `json { "status": "success", "data": [{"_id":"6694fb250efff48d309cb941","firstName":"Le","lastName":"Sapologue","email":"test@gmail.com","password":"$2b$10$lAYY62qOOSXRf2u0BQ3j5OP8trpWnHw46Pte36ZVlIfKY1hQpUMLu","createdAt":"2024-07-15T10:34:13.825Z","updatedOn":"2024-07-15T10:34:13.825Z","__v":0}] } ` |
| `/users`   | POST   | `firstName` (string, required), `lastName` (string, required), `email` (string, required), `password` (string, required)                     | Creates a new user in the DB   | `json { "status": "", "message": "error message"} ` |

---

## Error Handling

### Common Errors

| Status Code               | Description                                                           | Response                                                          |
| ------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 400 Bad Request           | The server could not understand the request due to invalid syntax.    | `json { "status": "error", "message": "Bad Request" } `           |
| 404 Not Found             | The server can not find the requested resource.                       | `json { "status": "error", "message": "Not Found" } `             |
| 500 Internal Server Error | The server has encountered a situation it do
