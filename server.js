const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const dontenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan')

//import routes
const userRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const conversationRoute = require('./routes/api/conversation');
const messagesRoute = require('./routes/api/messages');
const groupsRoute = require('./routes/api/groups');
const membersRoute = require('./routes/api/members');



//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get("/", (req, res)=> {
    res.send('Prueba del servidor')
})

//Routes 
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/groups', groupsRoute);
app.use('/api/members', membersRoute);


//DB config
const db = require('./config/keys').mongoURI;

//Connexion a la base de datos
mongoose.connect(
    db,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Conectado a MongoDB!!!')
    }
)

//Correr el servidor

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Backend server esta corriendo en el puerto ${port}`)
})


