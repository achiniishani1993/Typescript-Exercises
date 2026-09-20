## Task 1
1. GET /parties

* Status code:
200 OK

* Response:
[
    {
        "id": 1,
        "name": "Socialdemokraterna",
        "leader": "Magdalena Andersson",
        "seats": 100
    },
    {
        "id": 2,
        "name": "Moderaterna",
        "leader": "Ulf Kristersson",
        "seats": 70
    },
    {
        "id": 3,
        "name": "Sverigedemokraterna",
        "leader": "Jimmie Åkesson",
        "seats": 62
    },
    {
        "id": 4,
        "name": "Vänsterpartiet",
        "leader": "Nooshi Dadgostar",
        "seats": 29
    },
    {
        "id": 5,
        "name": "Centerpartiet",
        "leader": "Elisabeth Thand Ringqvist",
        "seats": 25
    }
]

* Postman screenshot:
<img src="/images/task1.png" alt="screenshot" width="700">

## Task 2
2. POST /parties

* Status code:
201 Created

* Response:
{
    "message": "New Party added successfully",
    "party": {
        "id": 6,
        "name": "Miljöpartiet",
        "leader": "Amanda Lind"
    }
}

* Postman screenshot:
<img src="/images/task2.png" alt="screenshot" width="700">

## Task 4
3. PUT /parties/:id

* Status code:
success - 200 ok
Fail - 404 Not Found

* Sucess Response:

{
    "message": "Party updated successfully",
    "party": {
        "id": 1,
        "name": "Miljöpartiet",
        "leader": "Amanda Lind",
        "seats": "22"
    }
}

* fail Response: 

{
    "message": "Party not found"
}

* Postman screenshot:
<img src="/images/task 4a.png" alt="screenshot" width="700">
<img src="/images/task 4b.png" alt="screenshot" width="700">

## Task 5

4. DELETE /parties/:id 

* Status code:
success - 200 ok
Fail - 404 Not Found

* Sucess Response:
{
    "message": "Party deleted successfully"
}
* fail Response: 

{
    "message": "Party not found"
}

* Postman screenshot:
<img src="/images/task 5a.png" alt="screenshot" width="700">
<img src="/images/task 5b.png" alt="screenshot" width="700">

## Task 6

5. Handling Bad Input

* Status code: 400 Bad Request

* Response:

{
    "message": "Insuffient data"
}

* Postman screenshot:
<img src="/images/task6.png" alt="screenshot" width="700">

## Task 7 Explicit Status on Create

Confirmed responds with res.status(201).json(...). Checked task 2 screenshot.

## Task 8

6. GET /parties/seats-total

* Status code: 200 ok

* Response:

{
    "totalSeats": 286
}

* Postman screenshot:
<img src="/images/task8.png" alt="screenshot" width="700">