import express from "express";
import createCscDb from "./../controllers/create-db.js";

const router = express.Router();

router.post("/createdb", createCscDb);

export default router;
