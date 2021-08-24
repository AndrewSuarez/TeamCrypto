const router = require('express').Router();
const Member = require('../../models/Member');
const User = require('../../models/User');
const Group = require('../../models/Group');

//Nuevo miembro
router.post('/', async (req, res) => {
  const newMember = new Member(req.body);
  try {
    const savedMember = await newMember.save();
    res.status(200).json(savedMember);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all members for a group
router.get('/:groupId/:except?', function (req, res) {
  Member.find({ groupId: req.params.groupId }, (err, member) => {
    User.populate(member, { path: 'userId' }, function (err, member) {
      const members = member.filter((m) => {
        return m.userId._id != req.params.except;
      });
      res.status(200).send(members);
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

//Update
router.put('/:groupId', async (req, res) => {
  if (req.body.groupId === req.params.groupId) {
    try {
      if (req.body.role) {
        const members = await Member.findOneAndUpdate(
          {
            groupId: req.body.groupId,
            userId: req.body.userId,
          },
          { role: req.body.role }
        );
      } else if (req.body.tareas) {
        const members = await Member.findOneAndUpdate(
          {
            groupId: req.body.groupId,
            userId: req.body.userId,
          },
          { $push: { tareas: req.body.tareas } }
        );
      }
      res.status(200).json('Cuenta actualizada');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('Solo puedes modificar tu grupo');
  }
});

//borrar tareas
router.put('/:groupId/tarea', async (req, res) => {
  if (req.body.groupId === req.params.groupId) {
    try {
      const members = await Member.findOne({
        groupId: req.body.groupId,
        userId: req.body.userId,
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
  } else {
    return res.status(403).json('Solo puedes modificar tu grupo');
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

module.exports = router;
