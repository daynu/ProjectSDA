const express = require('express')
const bodyParser = require('body-parser')
const passportLocalMongoose = require('passport-local-mongoose')
const cors = require('cors')
const app = express()
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}))

app.use(cors())


//MONGO SETUP
const mongoose = require('mongoose')
const { use } = require('passport')

const mongoURI = 'mongodb+srv://danu:danu@cluster0.4zkmykg.mongodb.net/'
const googleClient = new OAuth2Client('840492136831-d7hc0cqsh2cgh6fl0jk5ma4j3kjs4mlg.apps.googleusercontent.com');

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
  password: String, 
  admin: Boolean
});

const eventSchema = new Schema({
  title: String,
  date: String,
  picture: String,
  location: String,
  hour: String,
  description: String,
  organizer: String,
  link: String,
  category: String
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

app.get('/api/event/:id', async function (req, res) {
  const eventId = req.params.id;

  try {
    const eventRes = await Event.findById(eventId);

    if (!eventRes) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(eventRes);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/userRole/:name', async function (req, res)
{
  const userName = req.params.name

  const userRole = await findUserRole(userName)

  res.json({isAdmin: userRole})
})


app.post('/google-user-add', async (req, res) => {
  const { name, email } = req.body;
  if(name && email)
  {
    try {

    const existingUser = await User.findOne({ username: name });

    if (!existingUser) {
      addUser(name, email);
    }

    res.status(200).send('Success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  }
  
});


app.post('/signup', async function(req, res) {
  const { name, email, password } = req.body;

  const cryptedPassword = await passwordCrypt(password)

  try {
    const existingUser = await User.findOne({ username: name });

    if (existingUser) {
      return res.json("exists");
    }

    addUser(name, email, cryptedPassword);

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
      bcrypt.compare(password, user.password, (err, result) =>
      {
        if(err ||!result)
        {
          res.json("Parola incorecta!")
        }
        else
        {
          res.json("Logged in")
        }
      })
    }
    else
    {
      res.json("Nume invalid!")
    }

  }
  catch(e)
  {
    console.log(e)
  }


})

app.post('/addevent', async function(req, res)
{
  const {title, date, picture, location, hour, description, organizer, link, category} = req.body

  addEvent(title, date, picture, location, hour, description, organizer, link, category)

  res.json("Event added")
})

//ADD FUNCTIONS

function addUser(name, email, password)
{
  const newUser = new User(
    {
      username: name,
      email: email,
      password: password,
      admin: false
    }
  )

  newUser.save()
}

function addEvent(title, date, picture, location, hour, description, organizer, link, category)
{
  const newEvent = new Event(
  { 
    title: title,
    date: date,
    picture: picture,
    location: location,
    hour: hour,
    description: description,
    organizer: organizer,
    link: link,
    category: category
  }
  )

  newEvent.save()
}


async function findUserRole(name)
{
  try {
    const user = await User.findOne({ username: name });
    if (user) {
      return user.admin;
    }
  } catch (error) {
    
    console.error('Error finding user role:', error);
  }
}


async function passwordCrypt(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt); 
    return hash; 
  } catch (error) {
    throw error; 
  }
}

app.listen(5000)