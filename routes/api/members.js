const router = require('express').Router();
const Member = require('../../models/Member');

//Nuevo miembro
router.post('/', async (req, res) =>{
    const newMember = new Member(req.body)
    try{
        const savedMember = await newMember.save();
        res.status(200).json(savedMember);
    }catch(err){
        res.status(500).json(err)
    }
})

//Get
router.get('/:groupId', async(req, res)=>{
    try{
        const members = await Member.find({
            groupId: req.params.groupId
        })
        res.status(200).json(members)
        }catch(err){
        res.status(500).json(err)
    }
})

//Update
router.put('/:groupId', async(req,res)=> {
    if(req.body.groupId === req.params.groupId){
            try{
                const members = await Member.findOneAndUpdate({
                    groupId: req.body.groupId,
                    userId: req.body.userId
                }, 
                    {role: req.body.role,
                    $push: {tareas: req.body.tareas}}
                )
                res.status(200).json('Cuenta actualizada')
            }catch(err){
                return res.status(500).json(err)
            }
    }else {
        return res.status(403).json('Solo puedes modificar tu grupo')
    }
});

//borrar tareas
router.put('/:groupId/tarea', async(req,res)=> {
    if(req.body.groupId === req.params.groupId){
            try{
                const members = await Member.findOne({
                    groupId: req.body.groupId,
                    userId: req.body.userId
                })
                if (members.tareas.includes(req.body.tareas)){
                    await members.updateOne(({$pull: {tareas:req.body.tareas}}))
                    res.status(200).json('Tarea Eliminada')
                }else{
                    res.status(404).json('Este usuario no tiene esta tarea pendiente');
                }
            }catch(err){
                res.status(500).json(err)
            }
    }else {
        return res.status(403).json('Solo puedes modificar tu grupo')
    }
});

//Borrar miembro
router.delete('/:groupId', async(req,res)=> {
    if(req.body.groupId === req.params.groupId){
        try{
            const members = await Member.findOneAndDelete({
                groupId: req.body.groupId,
                userId: req.body.userId
            })
            res.status(200).json("Miembro eliminado")
        }catch(err){
            res.status(500).json(err)
        }
    }else {
        return res.status(403).json('Solo puedes borrar miembros de tu grupo')
    }
});

module.exports = router 