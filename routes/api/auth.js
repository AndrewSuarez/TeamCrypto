const router = require('express').Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');
const _ = require('lodash');
// const bcrypt = require('bcrypt')
const MAILGUN_APIKEY = '033bf32c94a6507f85aaa9bd84d2972b-156db0f1-6403b70b';
const DOMAIN = 'sandbox04f6f8ba727a4801a8343ca4686f2fe8.mailgun.org';
const JWT_SECRET =
  'aefecafac68bfcde5e27afe0a61e092ce2bdf718d666d387c7750b3e4373b6647cef92';
const JWT_EXPIRE = '25min';
const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN });

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

    console.log(user);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    const data = {
      from: 'noreply@teamcrypto.com',
      to: email,
      subject: 'Cambio de contraseña',
      html: `
             <h2>Por favor haz click en el enlace a continuacion para recuperar tu contraseña</h2>
             <a href="http:/localhost:3000/forgot-password/activate/${token}">Recuperar mi acceso</a>
             <p>token: ${token}</p>
      `,
    };

    user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: 'Error en el link provisional' });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          return res.status(200).json({
            message: 'El email ha sido enviado, siga las instruccione',
          });
        });
      }
    });
  });
});

router.post('/reset-password', async (req, res) => {
  const { resetLink, newPass } = req.body;

  if (resetLink) {
    jwt.verify(resetLink, JWT_SECRET, (error, decodedData) => {
      if (error) {
        return res
          .status(500)
          .json({ error: 'El token es incorrecto o ya expiro.' });
      }
      User.findOne({ resetLink }, (err, user) => {
        if (err || !user) {
          res
            .status(400)
            .json({ error: 'No existe ningun usuario con este token' });
        }
        const obj = {
          password: newPass,
        };

        user = _.extend(user, obj);
        user.save((err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ error: 'Error en el link provisional' });
          } else {
            res
              .status(200)
              .json({ message: 'La contaseña se actualizo con exito' });
          }
        });
      });
    });
  } else {
    res.status(401).json({ error: 'Error de autenticacion!' });
  }
});

module.exports = router;
