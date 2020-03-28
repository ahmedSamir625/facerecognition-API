const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
     res.send('it is working');
    // console.log('it is working !');
    
})

// Signing In
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
//Registering 
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
//Getting User Profile  
app.get('/profile/:id', (req, res) => { profile.profileGet(req, res, db) })
//gtting image 
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleAPICall(req, res) })


// app.listen(3000, () => {
//     console.log(`-- server is ready..`);
// })

app.listen(process.env.PORT||3000, () => {
    console.log(`-- server is ready..${process.env.PORT}`);
})
