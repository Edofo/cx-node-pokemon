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


router.get('/api/:language/pokemons/info', (req, res) => {
  if (!itemList[req.query.id - 1]) {

    const langage = req.params.language;

    const pokename = req.query.name;
    const pokeverif =  itemList.find(c => c.name[langage] === pokename);

    if (pokeverif === undefined) {
      
      const poketype = req.query.type;

      const pokeverif =  itemList.find(c => c.type === poketype);

      if (pokeverif === undefined) {

        /*const poketype = req.query.type;
        console.log(poketype)
        
        const pokeverif =  itemList.includes(poketype, type)
        console.log(pokeverif)*/
        return res.status(400).send("Sorry the specific Pokemon not found");

      }

      return res.json(itemList.find(c => c.type == poketype));

    };

    return res.json(itemList.find(c => c.name[langage] === pokename));

  }

  return res.json(itemList[req.query.id - 1]);
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