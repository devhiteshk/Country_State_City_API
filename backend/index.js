import dotenv from "dotenv";

import mongoose from "mongoose";
import app from "./app.js";
import PORT from "./config/PORT.js";

dotenv.config();

const db = process.env.MONGODB_URI;

mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => `Server running on port port ${PORT}🔥`);
