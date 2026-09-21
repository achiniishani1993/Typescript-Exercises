## Random Person API

A small Express + TypeScript API built for practicing Fetch, Zod validation, Express routes, and HTTP status codes.

1. Task 1

GET /ping

Checks that the server is running.

{
  "message": "pong"
}
2. Task 2

GET /random-person

Fetches a random person from the Random User API and returns:

{
  "name": "Jesse Niva",
  "country": "Finland"
}
* Postman screenshot:
<img src="/images/task2.png" alt="screenshot" width="700">

The external API response is validated with Zod before returning the data.

Returns 500 if fetching or validation fails.

3. Task 3

POST /users

Accepts a JSON user object:

{
    "name": "Amanda Lind",
    "age": 28,
    "email": "achinin@gmail.com"
}
* Postman screenshot:
<img src="/images/task3-a.png" alt="screenshot" width="700">

Validation rules:

name: 3–12 characters
age: optional, 18–100, defaults to 28
email: must be valid and is converted to lowercase

Successful requests return 201 Created.

Invalid requests return 400 Bad Request with Zod validation errors.

* Postman screenshot:
<img src="/images/task3-b.png" alt="screenshot" width="700">