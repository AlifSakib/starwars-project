const express = require("express");
const router = express.Router();
const {
  getAllCharacters,
  getCharacterById,
  searchCharacters,
} = require("../controllers/characterController");

// GET all characters with pagination
router.get("/", getAllCharacters);

// GET character by ID
router.get("/:id", getCharacterById);

// GET search characters by name
router.get("/search/:name", searchCharacters);

module.exports = router;
