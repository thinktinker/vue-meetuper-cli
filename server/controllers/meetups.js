const Meetup = require('../models/meetups');

const getMeetups = function(req, res) {
  Meetup.find({})
        .populate('category')
        .populate('joinedPeople')
        .exec((errors, meetups) => {

    if (errors) {
      return res.status(422).send({errors});
    }
    return res.json(meetups);
  });
}

const getMeetupById = function(req, res) {
  const {id} = req.params;

  Meetup.findById(id)
        .populate('meetupCreator', 'name id avatar')
        .populate('category')
        .populate({path: 'joinedPeople',
           options: {limit: 5, sort: {username: -1}}})
        .exec((errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }
    return res.json(meetup);
  });
}

const getSecret = function(req, res){
    res.send("This is a secret")
}

module.exports = {
  getMeetups,
  getMeetupById,
  getSecret
}
