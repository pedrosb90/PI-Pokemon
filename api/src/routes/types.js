const express = require("express");
const { getAllTypes } = require("../controllerFunctions/cntrl");

const types = express.Router();

types.get("/", async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    res.status(200).json(allTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get pokemon types" });
  }
});

module.exports = types;
