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

//Nuevo conversacion Grupal
router.post('/groupchat/:groupId', async(req, res)=>{
    const newConversation = new Conversation({
        groupId: req.params.groupId,
    })
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err)
    }
})


//get conversacion
router.get('/:groupId/:userId?/:memberId?', async(req, res)=> {
    try{
        if ((req.params.userId) && (req.params.memberId)){
            const conversation = await Conversation.findOne({
                groupId: req.params.groupId,
                members: {$all: [req.params.userId, req.params.memberId]},
            });
            res.status(200).json(conversation)
        }else{
            const conversation = await Conversation.findOne({
                groupId: req.params.groupId,
                members: { $exists: true, $size: 0 },
            });
            res.status(200).json(conversation)
        }
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router 