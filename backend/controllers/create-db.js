import { CountryCityState } from "../models/countryCityState.js";
import { data } from "./CreateCSCdb.js";

// Desc: create database
// Method: POST
// Access: Private
// Path: /create-csc-db/

const createCscDb = async (req, res) => {
  try {
    await CountryCityState.insertMany(data);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default createCscDb;
