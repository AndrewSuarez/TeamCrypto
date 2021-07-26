const router = require('express').Router();
const Group = require('../../models/Group');

//Nuevo grupo
router.post('/', async(req, res) => {
    try{
        const newGroup = new Group({
            name:req.body.name
    })
        const grupo = await newGroup.save()
        res.status(200).json(grupo)
    }catch(err){
        res.status(500).json(err);
    }
})


//get 
router.get('/:groupId', async(req, res)=>{
    try{
        const group = await Group.findById(req.params.groupId);
        res.status(200).json(group)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router 