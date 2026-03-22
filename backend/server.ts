import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

// routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Api is running");
});

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});