const express = require('express')
const app = express()


app.get('/api', function(req, res, next)
{
    res.json({"users": ["Coliban", 'Moraru']})
})


//MONGO SETUP
const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://danu:danu@test0.hlgvzt2.mongodb.net/'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

const Coliban = new User({
    name: "COLIBAN",
    email: "coliban@gmail.com"
})

Coliban.save()


app.listen(5000)