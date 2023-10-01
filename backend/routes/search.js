import express from "express";
import searchInDB from "./../controllers/searchDB.js";

const router = express.Router();

router.get("/search-db", searchInDB);

export default router;
