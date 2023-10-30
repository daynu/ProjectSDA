const express = require('express')
const app = express()





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

const eventSchema = new Schema({
  name: String,
  date: String
})

const Event = mongoose.model('Event', eventSchema)

const User = mongoose.model('User', userSchema);

function addUser(name, email)
{
  const newUser = new User(
    {
      name: name,
      email: email
    }
  )

  newUser.save()
}

addUser('Dan', 'danucelcurajos')

const Rockstadt = new Event(
  {
    name: 'Rockstadt',
    date: '12/11/2023'
  }
)

Rockstadt.save()

app.get('/api/users', async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/events', async function (req, res)
{
  try
  {
    const events = await Event.find()
    res.json(events)
  } catch(err)
  {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
})

app.listen(5000)