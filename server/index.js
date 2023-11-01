const express = require('express')
const bodyParser = require('body-parser')
const passportLocalMongoose = require('passport-local-mongoose')
const cors = require('cors')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())


//MONGO SETUP
const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://danu:danu@cluster0.4zkmykg.mongodb.net/'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
});

const eventSchema = new Schema({
  name: String,
  date: String
})

userSchema.plugin(passportLocalMongoose)

const Event = mongoose.model('Event', eventSchema)

const User = mongoose.model('User', userSchema);

//ROUTES

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

app.post('/signup', async function(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: name });

    if (existingUser) {
      return res.json("exists");
    }

    // Assuming addUser is a synchronous function that adds the user to the database
    addUser(name, email, password);

    res.json({ success: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error registering user' });
  }
});

app.post("/login", async function(req, res)
{
  const {name, password} = req.body

  try
  {
    const user = await User.findOne({username: name})

    if(user)
    {
      if(password === user.password)
      {
        res.json("Logged in")
      }
      else
      {
        res.json("Wrong password")
      }
    }
    else
    {
      res.json("User hasn't registered yet")
    }

  }
  catch(e)
  {
    console.log(e)
  }


})

//ADD FUNCTIONS

function addUser(name, email, password)
{
  const newUser = new User(
    {
      username: name,
      email: email,
      password: password
    }
  )

  newUser.save()
}

function addEvent(name, date)
{
  const newEvent = new Event(
  {
    name: name,
    date: date
  }
  )

  newEvent.save()
}



app.listen(5000)