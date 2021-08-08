const router = require('express').Router();
const Conversation = require('../../models/Conversation');

//Nueva conversacion 
router.post('/:groupId', async(req, res)=>{
    const newConversation = new Conversation({
        groupId: req.params.groupId,
        members: [req.body.senderId, req.body.receiverId],
    })

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err)
    }
})

//get conversacion
router.get('/:groupId', async(req, res)=> {
    try{
        const conversation = await Conversation.find({
            groupId: req.params.groupId,
            members: {$in: [req.body.userId]},
        });
        res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router 