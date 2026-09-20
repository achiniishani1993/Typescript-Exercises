import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

type Party = {
  id: number;
  name: string;
  leader: string;
  seats: number;
};

type PartyParams = {
  id: string;
};

let parties: Party[] = [
  {
    id: 1,
    name: "Socialdemokraterna",
    leader: "Magdalena Andersson",
    seats: 100,
  },
  {
    id: 2,
    name: "Moderaterna",
    leader: "Ulf Kristersson",
    seats: 70,
  },
  {
    id: 3,
    name: "Sverigedemokraterna",
    leader: "Jimmie Åkesson",
    seats: 62,
  },
  {
    id: 4,
    name: "Vänsterpartiet",
    leader: "Nooshi Dadgostar",
    seats: 29,
  },
  {
    id: 5,
    name: "Centerpartiet",
    leader: "Elisabeth Thand Ringqvist",
    seats: 25,
  },
];
// Task 1: List All Parties
// status 200 ok
app.get("/parties", (req: Request, res: Response): void => {
  res.json(parties);
});

// Task 2: Add a New Party + Task 6: Handling Bad Input
// Task 2- status 201 Created
// Task 6 - status 400 Bad Request

app.post("/parties", (req: Request, res: Response) => {
  if (!req.body.name || !req.body.leader) {
    res.status(400).json({ message: "Insuffient data" });
  } else {
    const newParty: Party = {
      id: parties.length + 1,
      name: req.body.name,
      leader: req.body.leader,
      seats: req.body.seats,
    };

    parties.push(newParty);

    res.status(201).json({
      message: "New Party added successfully",
      party: newParty,
    });
  }
});

// Task 3: Testing With postman
// check readme file

// Task 4: Update a Party's Info
// status 200 ok

app.put("/parties/:id", (req: Request<PartyParams>, res: Response): void => {
  // console.log(req.params)
  const partyId: number = parseInt(req.params.id);

  const party = parties.find((party) => party.id === partyId);

  if (!party) {
    res.status(404).json({ message: "Party not found" });
    return;
  }

  if (req.body.name !== undefined) {
    party.name = req.body.name;
  }

  if (req.body.leader !== undefined) {
    party.leader = req.body.leader;
  }

  if (req.body.seats !== undefined) {
    party.seats = req.body.seats;
  }

  res.json({
    message: "Party updated successfully",
    party,
  });
});

// Task 5: Remove a Party
// status not success- 404Not Found
// sucess - 200 ok

app.delete("/parties/:id", (req: Request<PartyParams>, res: Response): void => {
  const partyId: number = parseInt(req.params.id);
  const party = parties.find((party) => party.id === partyId);

  if (!party) {
    res.status(404).json({ message: "Party not found" });
    return;
  }

  parties = parties.filter((party) => party.id !== partyId);
  res.json({ message: "Party deleted successfully" });
});

// Task 8: A Seats Total Route
//status 200 ok
app.get("/parties/seats-total", (req: Request, res: Response): void => {
  let totalSeats = 0;
  parties.forEach((party) => (totalSeats += party.seats));
  res.json({ totalSeats });
});

app.listen(PORT, () => {
  console.log(`Sever is running in http://localhost:${PORT}`);
});
