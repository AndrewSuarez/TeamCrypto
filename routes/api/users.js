const User = require('../../models/User');
const router = require('express').Router();
// const bcrypt = require('bcrypt')

//Update
// router.put('/:id', async(req,res)=> {
//     if(req.body.userId === req.params.id){
//         if(req.body.password){
//             try{
//                 const salt = await bcrypt.genSalt(8)
//                 req.body.password = await bcrypt.hash(req.body.password, salt)
//             }catch(err){
//                 return res.status(500).json(err)
//             }
//         }
        
//         try{
//             const user = await User.findByIdAndUpdate(req.params.id, {
//                 $set: req.body
//             });
//             res.status(200).json('Cuenta actualizada')
//         }catch(err){
//             return res.status(500).json(err)
//         }

//     }else {
//         return res.status(403).json('Solo puedes modificar tu cuenta')
//     }
// });

//Delete
router.delete('/:id', async(req,res)=> {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Cuenta Borrada')
        }catch(err){
            return res.status(500).json(err)
        }

    }else {
        return res.status(403).json('Solo puedes borrar tu cuenta')
    }
});

//Get User
router.get('/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, createdAt, privateKey, solicitudes, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})

//Agregar contacto
router.put('/:id/contacto', async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.contactos.includes(req.body.userId)){
                await user.updateOne({ $push: {contactos: req.body.userId}})
                await currentUser.updateOne({ $push: {contactos: req.params.id}})
                res.status(200).json('Han sido agregados como contactos')
            }else {
                res.status(403).json('Este usuario ya esta agregado como contacto');
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("No puedes añadirte a ti mismo como contacto")
    }
})

//Borrar Contacto
router.put('/:id/delete', async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.contactos.includes(req.body.userId)){
                await user.updateOne({ $pull: {contactos: req.body.userId}})
                await currentUser.updateOne({ $pull: {contactos: req.params.id}})
                res.status(200).json('Han sido eliminados como contactos')
            }else {
                res.status(403).json('Los usuarios no son contactos');
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("No puedes borrarte a ti mismo como contacto")
    }
})

module.exports = router 