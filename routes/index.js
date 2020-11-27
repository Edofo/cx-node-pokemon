const express = require("express");
const fs = require('fs');

const router = express.Router();

const pokedex = fs.readFileSync('pokedex-20201127.json');
const itemList = JSON.parse(pokedex);


router.get('/pokemons', (req, res) => {
  if (!itemList) {
      return res.status(400).send("Sorry Pokemons not found")
  }
  res.json(itemList);
})


router.get('/pokemons/:id', (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific Pokemon not found");
  }
  res.json(itemList[req.params.id - 1]);
})



router.post('/items', (req, res) => {
  const item = {
      id: itemList.length + 1,
      name: req.body.name,
      description: req.body.description,
  }
  itemList.push(item);
  res.json(item);
})


router.delete("/items/:id", (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific Pokemon not found");
  }
  itemList.splice(itemList.indexOf(itemList[req.params.id - 1]), 1)
  res.json(itemList);
})


module.exports = router;