## Task 1
1. GET /

* What it returns:
A plain text welcome message.

* Status code:
200 OK

* Response:
Welcome to my sports teams

* Postman screenshot:
<img src="/images/task1.png" alt="screenshot" width="700">

## Task 2
2. GET /teams

* What it returns:
A JSON object containing my favorite sports teams, players, positions, and the date the data was last updated.

* Status code:
200 OK

* Response includes:

{
    "title": "My Favorite NBA basketball Teams and Players",
    "categories": {
        "teams": [
            "Cleveland Cavaliers",
            "Houston Rockets",
            "Los Angeles Lakers"
        ],
        "players": [
            "James Harden",
            "LeBron James",
            "Kevin Durant"
        ],
        "positions": [
            "Forward",
            "Power Guard",
            "Power Forward"
        ]
    },
    "lastUpdated": "2026-09-14"
}

* Postman screenshot:
<img src="/images/task2.png" alt="screenshot" width="700">



## Task 4
* What it returns:
A JSON object with descriptive information about sports teams.

* Status code:
200 OK

* Response includes:
{
    "title": "Favorite NBA Teams",
    "description": "There are three main teams, and among them, the Lakers are the most popular. However, the New York Knicks were the champions in 2026.",
    "Players": "My ranking of the three players is: 1. LeBron James, 2. Kevin Durant, and 3. James Harden.",
    "funFact": "LeBron James, Kevin Durant, and James Harden are all NBA superstars who have scored over 30,000 career points combined, making them some of the most prolific scorers of their generation."
}
* Postman screenshot:
<img src="/images/about.png" alt="screenshot" width="700">

## Task 5
* What it returns:
A simple contact message using res.send().

* Status code:
200 OK

* Response:
Contact us via achiniishani1993@gmail.com

* Postman screenshot:
<img src="/images/contact.png" alt="screenshot" width="700">

## Task 6
* What it returns:
Try requesting a route you never built and see what Postman shows you

* Status code:
404 Not Found

* Postman screenshot:
<img src="/images/404.png" alt="screenshot" width="700">

## Task 7

* what it returns : 
 set its status usingres.status(200).json(sports) instead of relying on the default. 
 
* Status code:
200 OK


* Response:
{"title":"My Favorite NBA basketball Teams and Players","categories":{"teams":["Cleveland Cavaliers","Houston Rockets","Los Angeles Lakers"],"players":["James Harden","LeBron James","Kevin Durant"],"positions":["Forward","Power Guard","Power Forward"]},"lastUpdated":"2026-09-14"}

* Postman screenshot:
<img src="/images/task 7.png" alt="screenshot" width="700">


## Task 8

* What it returns:
A maintenance message using res.status(503).send().

* Status code:
503 Service Unavailable

* Response:
We are down for maintaince, check back soon

<img src="/images/503.png" alt="screenshot" width="700">