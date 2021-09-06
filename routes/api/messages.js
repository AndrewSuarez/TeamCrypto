const router = require('express').Router();
const Message = require('../../models/Message');
const User = require('../../models/User')

//nuevo mensaje
router.post('/', async (req, res) =>{
  const newMessage = new Message(req.body)

  try{
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
  }catch(err){
      res.status(500).json(err)
  }
})

// //get
// router.get('/:conversationId', async(req, res)=> {
//     try{
//         const messages = await Message.find({
//             conversationId:req.params.conversationId,
//         })
//         res.status(200).json(messages);
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

router.get('/:conversationId', async (req, res) => {
  Message.find({ conversationId: req.params.conversationId }, (err, message) => {
    User.populate(message, { path: 'sender' }, function (err, message) {
      res.status(200).send(message);
    });
  });
});

router.get('/allFiles/:conversationId', (req, res) => {
  Message.find({conversationId: req.params.conversationId, fileName: {$exists: true} }, (err, messages) => {
    if(err) throw err 
    res.status(200).json(messages)
  })
})
module.exports = router 