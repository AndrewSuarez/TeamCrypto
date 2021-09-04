const router = require('express').Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt')

// registro
router.post('/register', async (req, res) => {
  try {
    //encrypt password
    // const salt = await bcrypt.genSalt(8);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //nuevo usuario
    const newUser = new User({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // save and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    //find email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('Usuario no encontrado');

    //find password
    // const validPass = await bcrypt.compare(req.body.password, user.password);
    const tempValidPass = req.body.password == user.password ? true : false;
    console.log(tempValidPass);
    !tempValidPass && res.status(400).json('Contraseña incorrecta');

    //send request
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'No existe un usuario con este email' });
    }

    const token = jwt.sign({ _id: user._id }, null, { expiresIn: '20m' });
    const data = {
      from: '',
      to: email,
      subject: 'Cambio de contraseña',
      html: ``,
    };

    return user.UpdateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'No existe un usuario con este email' });
      } else {
        //Enviar mensajes
      }
    });
  });
});

module.exports = router;
