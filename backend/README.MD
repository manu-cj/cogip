# API Documentation

## Overview

This documentation provides details about the API endpoints, including parameters and response formats.

---

## Endpoints

Ensure to always use `http://localhost:3000/api` as the root endpoint for any kind of request!

| Endpoint          | Method | Body                                               | Description                            | 
|-------------------|--------|------------------------------------------------------|-------------------------------------|
| `/users`          | GET    | None                                                 | Returns the list of all users         |
| `/users/:id`      | GET    | None                                                 | Returns user details for the given ID   |
| `/users`          | POST   | `firstName` (str), `lastName` (str), `email` (str), `password` (str)           | Creates a new user in the DB, then returns the user in response        |
| `/users/login`    | POST   | `email` (str), `password` (str)                | Attempts to log in user, if attempt successful, returns user as object             |
| |   | ||
| `/contacts`       | GET    | None                                                 | Returns the list of all contacts         |
| `/contacts/:id`       | GET    | None                                                 | Returns contact details for the given ID        |
| `/contacts`       | POST    | `name` (str), `companyID` (str), `email` (str), `phoneNr`(str)                                                 | Creates a new contact in the DB, then returns the contact in response       |
| `/contacts/:id`       | PATCH    | `name` (str), `email` (str), `phoneNr`(str)   | Edit contact details for the given contact ID        |
| `/contacts/:id`       | DELETE    | None  | Delete contact entry with matching id        |
| |   | ||
| `/images/users/:userId`          | PATCH    | `image` (file)                      | Updates the image for the user with matching id         |
| `/images/contacts/:contactId`          | PATCH    | `image` (file)                      | Updates the image for the contact with matching id         |


---

## Error Handling

### Common Errors

| Status Code               | Description                                                           | Response                                                          |
|---------------------------|-----------------------------------------------------------------------|-------------------------------------------------------------------|
| 400 Bad Request           | The server could not understand the request due to invalid syntax.    | `json { "status": "error", "message": "Bad Request" } `           |
| 404 Not Found             | The server can not find the requested resource.                       | `json { "status": "error", "message": "Not Found" } `             |
| 500 Internal Server Error | The server has encountered a situation it doesn't know how to handle. | `json { "status": "error", "message": "Internal Server Error" } ` |
