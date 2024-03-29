const express = require('express')
const bodyParser = require('body-parser')
const passportLocalMongoose = require('passport-local-mongoose')
const cors = require('cors')
const app = express()
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');


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
  user_role: String,
  interested_events: Array,
  added_events: Array
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
  category: String,
  interested_count: Number
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

app.get('/api/user/:name', async function (req, res)
{
    const userName = req.params.name;
    const user = await User.findOne({username: userName})
    res.json(user)
})

app.get('/api/userRole/:name', async function (req, res)
{
  const userName = req.params.name

  const userRole = await findUserRole(userName)

  res.json({role: userRole})
})


app.post('/google-user-add', async (req, res) => {
  const { name, email } = req.body;
  if(name && email)
  {
    try {

    const existingUser = await User.findOne({ email: email });

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
  const {title, date, picture, location, hour, description, organizer, link, category, user} = req.body

  addEvent(title, date, picture, location, hour, description, organizer, link, category, user)

  res.json("Event added")
})


app.post('/addInterestedEvent/:eventId/:userName', async function(req, res)
{
  try
  {
    const eventId = req.params.eventId;
    const userName = req.params.userName;

    await Event.findByIdAndUpdate(eventId, {$inc: {interested_count: 1}})
    await User.findOneAndUpdate({username: userName}, {$push: {interested_events: eventId}})
  }
  catch(e)
  {
    console.log(e)
  }

})

app.post('/removeInterestedEvent/:eventId/:userName', async function(req, res)
{
  try
  {
    const eventId = req.params.eventId;
    const userName = req.params.userName;
    
    await Event.findByIdAndUpdate(eventId, {$inc: {interested_count: -1}})
    await User.findOneAndUpdate({username: userName}, {$pull: {interested_events: eventId}})
  }
  catch(e)
  {
    console.log(e)
  }
})


app.delete('/delete/:id', async function (req, res) {
  const eventId = req.params.id;

  try {
    const eventRes = await Event.findByIdAndDelete(eventId);

    if (!eventRes) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(eventRes);
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

})

app.delete('/deleteUser/:name', async function (req, res) {

  const userName = req.params.name;
  try {
    let user = await User.findOneAndDelete({username: userName});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Event.deleteMany({_id: {$in: user.added_events}});
    res.json("User deleted");
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.put('/edit/:id', async function (req, res) {

  const eventId = req.params.id;
  const {title, date, picture, location, hour, description, organizer, link, category} = req.body

  try {
    const eventRes = await Event.findByIdAndUpdate(eventId, {title: title, date: date, picture: picture, location: location, hour: hour, description: description, organizer: organizer, link: link, category: category});

    if (!eventRes) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(eventRes);
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

})

app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: 'bventbrasov@gmail.com',
      pass: 'qfxi smco ztpo jaob',
  }});

  let mailOptions = {
    from: 'bventbrasov@gmail.com',
    to: 'bventbrasov@gmail.com',
    subject: 'New Premium Access Request',
    text: `New premium access request from ${firstName} ${lastName}. Email: ${email}, Phone: ${phone}.`,
    html: `<p>New premium access request from ${firstName} ${lastName}.</p><p>Email: ${email}</p><p>Phone: ${phone}</p><a href = "http://localhost:3000/confirm-organizer/${email}"><button>Confirm Access</button></a>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/confirm-organizer/:email', async (req, res) => {

  const { email } = req.params;
  
  try {
    let user = await User.findOneAndUpdate({ email: email }, { user_role: 'organizer' });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User role updated' });
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
      password: password,
      admin: false,
      interested_events: []
    }
  )

  newUser.save()
}

function addEvent(title, date, picture, location, hour, description, organizer, link, category, user)
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
    category: category,
    interested_count: 0
  }
  )

  newEvent.save()
  .then((savedEvent) => {
    User.findOne({username: user})
      .then((UserNeeded) => {
        UserNeeded.added_events.push(savedEvent._id);
        UserNeeded.save();
      })
      .catch((error) => {
        console.error('Error finding user:', error);
      });
  })
  .catch((error) => {
    console.error('Error saving event:', error);
  });
}


async function findUserRole(name)
{
  try {
    const user = await User.findOne({ username: name });
    if (user) {
      return user.user_role;
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});