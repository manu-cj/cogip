# API Documentation

## Overview

This documentation provides details about the API endpoints, including parameters and response formats.

---

## Endpoints

| Endpoint          | Method | Params                                                | Response                                                                                                                                                                            |
| ----------------- | ------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/api/users`      | GET    | None                                                  | `json { "status": "success", "data": [ { "id": 1, "name": "John Doe", "email": "john.doe@example.com" }, { "id": 2, "name": "Jane Smith", "email": "jane.smith@example.com" } ] } ` |
| `/api/users/{id}` | GET    | `id` (integer, required)                              | `json { "status": "success", "data": { "id": 1, "name": "John Doe", "email": "john.doe@example.com" } } `                                                                           |
| `/api/users`      | POST   | `name` (string, required), `email` (string, required) | `json { "name": "John Doe", "email": "john.doe@example.com" } `                                                                                                                     | `json { "status": "success", "data": { "id": 3, "name": "John Doe", "email": "john.doe@example.com" } } ` |
| `/api/users/{id}` | PUT    | `id` (integer, required)                              | `json { "name": "John Doe", "email": "john.doe@example.com" } `                                                                                                                     | `json { "status": "success", "data": { "id": 1, "name": "John Doe", "email": "john.doe@example.com" } } ` |
| `/api/users/{id}` | DELETE | `id` (integer, required)                              | `json { "status": "success", "message": "User deleted successfully." } `                                                                                                            |

---

## Error Handling

### Common Errors

| Status Code               | Description                                                           | Response                                                          |
| ------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 400 Bad Request           | The server could not understand the request due to invalid syntax.    | `json { "status": "error", "message": "Bad Request" } `           |
| 404 Not Found             | The server can not find the requested resource.                       | `json { "status": "error", "message": "Not Found" } `             |
| 500 Internal Server Error | The server has encountered a situation it doesn't know how to handle. | `json { "status": "error", "message": "Internal Server Error" } ` |
