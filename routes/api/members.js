const router = require('express').Router();
const Member = require('../../models/Member');
const User = require('../../models/User');
const Group = require('../../models/Group');
var ObjectId = require('mongodb').ObjectId;

//Nuevo miembro
router.post('/', async (req, res) => {
  try {
    if (req.body instanceof Array) {
      const newMember = req.body;
      const savedMember = await Member.insertMany(newMember, {
        ordered: false,
      });
      res.status(201).json(savedMember);
    } else {
      const newMember = new Member(req.body);
      const savedMember = await newMember.save();
      res.status(201).json(savedMember);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all members for a group
router.get('/:groupId/:except?', function (req, res) {
  Member.find({ groupId: req.params.groupId }, (err, member) => {
    User.populate(member, { path: 'userId' }, function (err, member) {
      try {
        const members = member.filter((m) => {
          return m.userId._id != req.params.except;
        });
        res.status(200).send(members);
      } catch (err) {
        res.status(500).send(err);
      }
    });
  });
});

//get current group user
router.get('/group/user/:groupId/:userId', async (req, res) => {
  try {
    const member = await Member.findOne({
      groupId: req.params.groupId,
      userId: req.params.userId,
    });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Todos los grupos de un usuario
router.get('/groups/user/:userId', async (req, res) => {
  try {
    const memberGroups = await Member.find({ userId: req.params.userId });
    const userGroups = await Promise.all(
      memberGroups.map((members) => {
        return Group.findById(members.groupId);
      })
    );
    res.status(200).json(userGroups);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update a member
router.put('/works/:memberId', async (req, res) => {
  try {
    if (req.body.tareas) {
      await Member.findOneAndUpdate(
        {
          _id: req.params.memberId,
        },
        { $push: { tareas: req.body.tareas } }
      );
    }
    res.status(200).json('Cuenta actualizada');
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Update
router.put('/update/:memberId', async (req, res) => {
  try {
    if (req.body.role) {
      await Member.findOneAndUpdate(
        {
          _id: req.params.memberId,
        },
        { role: req.body.role }
      );
    } else if (req.body.tareas) {
      const members = await Member.findOneAndUpdate(
        {
          _id: req.params.memberId,
        },
        { $push: { tareas: req.body.tareas } }
      );
    }
    res.status(200).json('Cuenta actualizada');
  } catch (err) {
    return res.status(500).json(err);
  }
});

//borrar tareas
router.put('/:memberId/tarea', async (req, res) => {
  try {
    const members = await Member.findOne({
      _id: req.params.memberId,
    });
    if (members.tareas.includes(req.body.tareas)) {
      await members.updateOne({ $pull: { tareas: req.body.tareas } });
      res.status(200).json('Tarea Eliminada');
    } else {
      res.status(404).json('Este usuario no tiene esta tarea pendiente');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Borrar miembro
router.delete('/:groupId', async (req, res) => {
  if (req.body.groupId === req.params.groupId) {
    try {
      const members = await Member.findOneAndDelete({
        groupId: req.body.groupId,
        userId: req.body.userId,
      });
      res.status(200).json('Miembro eliminado');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json('Solo puedes borrar miembros de tu grupo');
  }
});

router.post('/deleteMany', async(req, res) => {
  try{
      const respuesta = await Member.remove({userId: {$in: req.body.userId}, groupId: req.body.groupId})
      res.status(200).json(respuesta)
  }catch(err){1
    res.status(500).json(err)
  }
})

module.exports = router;
