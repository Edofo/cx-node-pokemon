const express = require("express");
const fs = require('fs');

const router = express.Router();

const pokedex = fs.readFileSync('pokedex-20201127.json');
const itemList = JSON.parse(pokedex);


router.get('/api/pokemons', (req, res) => {
  if (!itemList) {
      return res.status(400).send("Sorry Pokemons not found")
  }
  res.json(itemList);
})


router.get('/api/pokemons/:id', (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific Pokemon not found");
  }
  res.json(itemList[req.params.id - 1]);
})


router.get('/api/pokemons/info', (req, res) => {
  if (!itemList[req.query.id - 1]) {

    const pokename = req.query.name;
    const pokeverif =  itemList.find(c => c.name.english === pokename);

    if (pokeverif === undefined) {
      
      const poketype = req.query.type;
      console.log(poketype)

      const pokeverif2 =  itemList.find(c => c.type == poketype);
      console.log(pokeverif2)

      if (pokeverif2 === undefined) {

        return res.status(400).send("Sorry the specific Pokemon not found");

      }

      res.json(itemList.find(c => c.type == poketype));

    };

    res.json(itemList.find(c => c.name.english === pokename));

  }

  res.json(itemList[req.query.id - 1]);
})



router.post('/api/items', (req, res) => {
  const item = {
      id: itemList.length + 1,
      name: req.body.name,
      description: req.body.description,
  }
  itemList.push(item);
  res.json(item);
})


router.delete("/api/items/:id", (req, res) => {
  if (!itemList[req.params.id - 1]) {
      return res.status(400).send("Sorry the specific Pokemon not found");
  }
  itemList.splice(itemList.indexOf(itemList[req.params.id - 1]), 1)
  res.json(itemList);
})


module.exports = router;