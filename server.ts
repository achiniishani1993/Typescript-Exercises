import express from "express";
import { z } from "zod";
const app = express();
const PORT = 3000;
app.use(express.json());

const randomUserSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
        location: z.object({
        country: z.string(),
      }),
    })
  ).min(1),
});

const userSchema = z.object({
  name: z.string().min(3).max(12),

  age: z
    .number()
    .min(18)
    .max(100)
    .optional()
    .default(28),

  email: z.email().toLowerCase(),
});


// Skill 1: Minimal Server & Ping

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Skill 2: Fetch a Random Person

app.get("/random-person" , async (req , res)=>{
try {
     const response = await fetch("https://randomuser.me/api/");
     const data = await response.json();
     const result = randomUserSchema.safeParse(data);

     if (!result.success){
        return res.status(500).json({
        error: "Invalid data from RandomUser API",
        details: result.error,
        });
     }

    const randomPerson = result.data.results[0];
    const fullName = `${randomPerson?.name.first} ${randomPerson?.name.last}`;
      return res.status(200).json({
      name: fullName,
      country: randomPerson?.location.country,
    });
} catch (error) {
    res.status(500).json({
      error: "Failed to fetch random user",
    });  
}
});

// Skill 3: User Signup Route (POST)

app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid user data",
      details: result.error.issues,
    });
  }

  return res.status(201).json(result.data);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});