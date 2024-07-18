# API Documentation

## Overview

This documentation provides details about the API endpoints, including parameters and response formats.

---

## Endpoints

Ensure to always use `http://localhost:3000/api` as the root endpoint for any kind of request!

| Endpoint                | Method | Body                                                                          | Description                                                   |
|-------------------------|--------|-------------------------------------------------------------------------------|---------------------------------------------------------------|
| `/users`                | GET    | None                                                                          | Returns the list of all users                                 |
| `/users/:id`            | GET    | None                                                                          | Returns user details for the given ID                         |
| `/users`                | POST   | `firstName` (str), `lastName` (str), `email` (str), `password` (str)          | Creates a new user in the DB, then returns the user in response |
| `/users/login`          | POST   | `email` (str), `password` (str)                                               | Attempts to log in user, if attempt successful, returns user as object |
|                         |        |                                                                               |                                                               |
| `/contacts`             | GET    | None                                                                          | Returns the list of all contacts in alphabetical order        |
| `/contacts/pagination/:nbPerPage/:page?`             | GET    | None                                                                          | nbPerPage represents the count of results you want to show per page, the page is the page number you want to show the results for. If no page sent, page default will be 1. Returns results for the page, the totalResults and the totalPages        |
| `/contacts/latest`      | GET    | None                                                                          | Returns the 5 last added contacts                             |
| `/contacts/:id`         | GET    | None                                                                          | Returns contact details for the given ID                      |
| `/contacts/company/:companyId`| GET | None                                                                       | Returns list of contacts for the companyId given in URL                   |
| `/contacts`             | POST   | `name` (str), `companyID` (str), `email` (str), `phoneNr` (str)               | Creates a new contact in the DB, then returns the contact in response |
| `/contacts/:id`         | PATCH  | `name` (str), `email` (str), `phoneNr` (str)                                  | Edit contact details for the given contact ID                 |
| `/contacts/:id`         | DELETE | None                                                                          | Delete contact entry with matching id                         |
|                         |        |                                                                               |                                                               |
| `/images/users/:userId` | PATCH  | `image` (file)                                                                | Updates the image for the user with matching id               |
| `/images/contacts/:contactId` | PATCH  | `image` (file)                                                    | Updates the image for the contact with matching id            |
|                         |        |                                                                               |                                                               |
| `/invoices` | GET  | None                                                    | Returns a list of all the invoices sorted by newest to oldest            |
| `/invoices/latest` | GET  | None                                                    | Returns the list of the 5 latest invoices            |
| `/invoices/:id` | GET  | None                                                    | Returns the details of the invoice matching the ID given as param            |
| `/invoices/company/:companyId` | GET  | None                                                    | Returns the list of invoices for the company matching company ID sent in URL        |
| `/invoices/pagination/:nbPerPage/:page?`             | GET    | None                                                                          | nbPerPage represents the count of results you want to show per page, the page is the page number you want to show the results for. If no page sent, page default will be 1. Returns results for the page, the totalResults and the totalPages        |
| `/invoices` | POST  | `companyId` (str), `reference` (str)                 | Creates a new invoice in the DB, and returns the invoice details in response |
| `/invoices/:id` | DELETE  | None                 | Deletes the invoice matching the id sent in URL |
|                         |        |                                                                               |      
|  `/stats`          |   GET     |      NONE                                                                         |     Returns the total of existing invoices, contacts and companies

---

## Error Handling

### Common Errors

| Status Code               | Description                                                           | Response                                                          |
|---------------------------|-----------------------------------------------------------------------|-------------------------------------------------------------------|
| 400 Bad Request           | The server could not understand the request due to invalid syntax.    | `json { "status": "error", "message": "Bad Request" }`            |
| 404 Not Found             | The server can not find the requested resource.                       | `json { "status": "error", "message": "Not Found" }`              |
| 500 Internal Server Error | The server has encountered a situation it doesn't know how to handle. | `json { "status": "error", "message": "Internal Server Error" }`  |
