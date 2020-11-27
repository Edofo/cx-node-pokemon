const { json } = require("body-parser");
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



//Post requests
router.post('/', (req, res) => {
  const item = {
      id: itemList.length + 1,
      name: req.body.name,
      description: req.body.description,
  }
  itemList.push(item);
  res.json(item);
})



//Patch requests
router.patch("/:id", (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific item you tried to update was not found");
  }

  let newItem = itemList[req.params.id - 1];
  newItem.name = req.body.name;
  newItem.description = req.body.description;

  res.json(newItem);
})



//Delete requests
router.delete("/:id", (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific item you tried to delete was not found");
  }

  itemList.splice(itemList.indexOf(itemList[req.params.id - 1]), 1)

  res.json(itemList);
})



module.exports = router;