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
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Cuenta Borrada');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('Solo puedes borrar tu cuenta');
  }
});

//Get User (temporal mientras se habilita el log in)
router.get('/:id', function (req, res) {
  User.findById(req.params.id, (err, user) => {
    User.populate(
      user,
      {
        path: 'contactos',
        select: '_id nombre apellido username email profilePicture publicKey',
      },
      function (err, user) {
        if (err) res.status(500).json(err);
        User.populate(
          user,
          {
            path: 'solicitudes',
            select:
              '_id nombre apellido username email profilePicture publicKey',
          },
          function (err, user) {
            if (err) res.status(500).json(err);
            res.status(200).send(user);
          }
        );
      }
    );
  });
});

// router.get('/:id', async(req, res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         const {password, updatedAt, createdAt, privateKey, ...other} = user._doc
//         res.status(200).json(other)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

//-------------------------CONTACTOS-------------------------//
// //get all non contacts
router.get('/noContacts/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const allUsers = await User.find({
      _id: { $nin: user.contactos, $ne: req.params.id },
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Agregar contacto
router.put('/:id/agregar', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const otherUser = await User.findById(req.body.userId);
      if (!user.contactos.includes(req.body.userId)) {
        await user.update({
          $push: { contactos: req.body.userId },
          $pull: { solicitudes: req.body.userId },
        });
        await otherUser.updateOne({ $push: { contactos: req.params.id } });
        res.status(200).json('Han sido agregados como contactos');
      } else {
        await user.update({ $pull: { solicitudes: req.body.userId } });
        res.status(403).json('Este usuario ya esta agregado como contacto');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('No puedes añadirte a ti mismo como contacto');
  }
});

//Borrar Contacto
router.put('/:id/delete', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.contactos.includes(req.body.userId)) {
        await user.updateOne({ $pull: { contactos: req.body.userId } });
        await currentUser.updateOne({ $pull: { contactos: req.params.id } });
        res.status(200).json('Han sido eliminados como contactos');
      } else {
        res.status(403).json('Los usuarios no son contactos');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('No puedes borrarte a ti mismo como contacto');
  }
});

//Enviar solicitud
router.put('/:id/solicitud', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const otherUser = await User.findById(req.body.userId);
      if (!otherUser.solicitudes.includes(req.params.id)) {
        await otherUser.updateOne({ $push: { solicitudes: req.params.id } });
        res.status(200).json('Se ha enviado una solicitud');
      } else {
        res.status(403).json('Este usuario ya tiene una solicitud pendiente');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('No puedes enviarte una solicitud a ti mismo');
  }
});

//borrar Solicitud
router.put('/:id/solicitud/delete', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user.solicitudes.includes(req.body.userId)) {
        await user.updateOne({ $pull: { solicitudes: req.body.userId } });
        res.status(200).json('Has negado la solicitud');
      } else {
        res.status(403).json('No tienes una solicitud de este usuario');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('No puedes borrar una solicitud de ti mismo');
  }
});

//Update data users
router.post('/:userId/update', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  if (null != userId) {
    try {
      user = await User.findById(userId);
      await user.updateOne({
        $set: {
          username: req.body.username ? req.body.username : user.username,
          nombre: req.body.nombre ? req.body.nombre : user.nombre,
          apellido: req.body.apellido ? req.body.apellido : user.apellido,
          email: req.body.email ? req.body.email : user.email,
        },
      });
      const updatedUser = await User.findById(userId);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
