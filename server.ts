import express from "express";
const app = express();

app.use(express.json());
const PORT = 3000;

// Task 1: Homepage Route
app.get("/", (req, res) => {
  res.send("Welcome to my sports teams");
});

// Task 2: Main Data Route

app.get("/teams", (req, res) => {
  const sports = {
    title: "My Favorite NBA basketball Teams and Players",
    categories: {
      teams: ["Cleveland Cavaliers", "Houston Rockets", "Los Angeles Lakers"],
      players: ["James Harden", "LeBron James", "Kevin Durant"],
      positions: ["Forward", "Power Guard", "Power Forward"],
    },
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  res.json(sports);
});

// Task 4: A Second JSON Route
// 200 ok - attached screenshot in readme
app.get("/about", (req, res) => {
  const about = {
    title: "Favorite NBA Teams",
    description:
      "There are three main teams, and among them, the Lakers are the most popular. However, the New York Knicks were the champions in 2026.",
    Players:
      "My ranking of the three players is: 1. LeBron James, 2. Kevin Durant, and 3. James Harden.",
    funFact:
      "LeBron James, Kevin Durant, and James Harden are all NBA superstars who have scored over 30,000 career points combined, making them some of the most prolific scorers of their generation.",
  };

  res.json(about);
});

// 200 ok - attached screenshot in readme
// this route only needs to return a simple content not a object or list
app.get("/contact", (req, res) => {
  res.send("Contact us via achiniishani1993@gmail.com");
});

// Task 7: Setting Status Codes Explicitly
// 200 0k
app.get("/reteam", (req, res) => {
  const sports = {
    title: "My Favorite NBA basketball Teams and Players",
    categories: {
      teams: ["Cleveland Cavaliers", "Houston Rockets", "Los Angeles Lakers"],
      players: ["James Harden", "LeBron James", "Kevin Durant"],
      positions: ["Forward", "Power Guard", "Power Forward"],
    },
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  res.status(200).json(sports);
});

// Task 8: A Deliberate Error Response
// 503Service Unavailable

app.get("/maintain", (req, res) => {
  res.status(503).send("We are down for maintaince, check back soon");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// Task 6: Matching Status Codes to Scenarios

// suceess- 200 OK
// If the route did not exist: 404 Not Found - screenshot attached
