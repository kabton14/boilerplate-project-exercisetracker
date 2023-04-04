const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set("strictQuery", true)
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
});

const exerciseSchema = new mongoose.Schema({
    username: String,
    description: String,
    duration: Number,
    date: Number,
    _id: Number
});

const logSchema = new mongoose.Schema({
  username: String,
  count: Number,
  _id: Number,
  log: {
    description: String,
    duration: Number,
    date: String
  }
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const Log = mongoose.model('Log', logSchema);

let user = new User({username: "Sonny Simms"});
const addUser = (user, done) => {
  user.save((err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });
};

const findUserByUserName = (userName, done) => {
  User.find({username: userName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
