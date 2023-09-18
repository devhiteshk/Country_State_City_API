import express from "express";
import cors from "cors";
import searchRoute from "./routes/search.js";
import createDBrouter from "./routes/createdb.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// DB created on MONDAY 18th September 2023
// app.use("/crate-csc-db", createDBrouter);

app.use("/api/v1", searchRoute);

export default app;
