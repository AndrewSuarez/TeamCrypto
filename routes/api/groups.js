const router = require('express').Router();
const Group = require('../../models/Group');
const User = require('../../models/User')

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

router.put('/:groupId', async(req, res)=> {
    try{
        await Group.findByIdAndUpdate(req.params.groupId, {$set: {name: req.body.name}})
        res.status(200).json("Grupo actualizado")
    }catch(err){
        res.status(500).json(err)
    }
} )



module.exports = router 