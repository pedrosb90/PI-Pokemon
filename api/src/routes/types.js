const express = require("express");
const { getAllTypes, getDBTypes } = require("../controllerFunctions/cntrl");

const types = express.Router();

types.get("/", async (req, res) => {
  try {
    const types = await getDBTypes();

    if (types.length > 0) {
      res.json(types);
    } else {
      const apiTypes = await getAllTypes();
      res.status(200).json(apiTypes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get pokemon types" });
  }
});

module.exports = types;
