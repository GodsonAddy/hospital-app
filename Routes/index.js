const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const HospMessages = mongoose.model('HospMessages');

router.get('/', function (req, res) {
  
  return HospMessages.find({})
    .then((messages) => {
      return res.status(200).json({ messages: messages });
    });
})

router.get('/:id', function (req, res) {
  const { id } = req.params;
  HospMessages.findById(id)
    .then(message => {
      res.status(200).json(message || {})
    })
})

router.post('/', function (req, res) {
  const payload = {
    file: req.body.file,
    recepient: req.body.recepient,
    sender: req.body.sender,
    content: req.body.content,
    _id: new mongoose.Types.ObjectId()
  }
  const item = new HospMessages(payload)
  item.save()
  res.status(201).json(item);
})

router.patch('/:id', function (req, res) {
  const { id } = req.params;
  const payload = {
    file: req.body.file,
    recepient: req.body.recepient,
    sender: req.body.sender,
    content: req.body.content
  }
  HospMessages.findByIdAndUpdate(id, payload)
    .then(
      (message) => {
        res.status(201).json(message);
      }
    )
    .catch(
        res.status(400).json({ _id: id, message: 'item not found' })
        
    )
})

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  HospMessages.findByIdAndDelete(id)
    .then(
      res.status(201).json({_id: id, message: 'item deleted successfully'})
    )
    .catch(res.status(400).json({_id: id, message: 'item not found'}))
})

module.exports = router;