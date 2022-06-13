 const {Costumers , validate} =require('../modules/costumers');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  const costumers = await Costumers.find().sort('name');
  res.send(costumers);
});

router.post('/',async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let costumers = new Costumers({name: req.body.name,isGold :req.body.isGold,phone :req.body.phone});
  costumers = await costumers.save();
  res.send(costumers);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

   const costumers= await Costumers.findByIdAndUpdate(req.params.id, {name : req.body.name , isGold :req.body.isGold,phone :req.body.phone}, { new :true});

  if (!costumers) return res.status(404).send('The costumers with the given ID was not found.');
  res.send(costumers);
});

router.delete('/:id', async (req, res) => {
  const costumers = await Costumers.findByIdAndDelete(req.params.id);
  
  if (!costumers) return res.status(404).send('The costumers with the given ID was not found.');
  res.send(costumers);
});

router.get('/:id', async(req, res) => {
  const costumers = await Costumers.findById(req.params.id);
  if (!costumers) return res.status(404).send('The costumers with the given ID was not found.');
  res.send(costumers);
});


module.exports = router;