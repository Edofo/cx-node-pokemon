const express = require("express");
const router = express.Router();
const fs = require('fs');

router.use(express.json());

const pokedex = fs.readFileSync('pokedex-20201127.json');
const itemList = JSON.parse(pokedex);

//Get request
router.get('/', (req, res) => {
  if (!itemList) {
      return res.status(400).send("Sorry Items not found..")
  }
  res.json(itemList);
})

router.get('/:id', (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific item you asked was not found");
  }
  res.json(itemList[req.params.id - 1]);
})


module.exports = router;