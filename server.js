const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dontenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan')

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get("/", (req, res)=> {
    res.send('Prueba del servidor')
})

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


