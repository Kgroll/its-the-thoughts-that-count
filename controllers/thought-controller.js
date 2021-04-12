const { Thought, User, Types} = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'users',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(500).jsn(err);
      })
  },
  //get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'users',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add thought to User
  createThought({ params, body }, res) {
    // console.log(params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body, 
      { new: true, runValidators: true }
      )
      .then(updatedThought => {
        if (!updatedThought) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(updatedThought);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  deleteThought({ params, body }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought with this id!' });
          return ;
        }
          res.json(deletedThought);
      })        
      .catch(err => res.json(err));
     
  },

  // add reaction to thought
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },


  // remove reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))          
      .catch(err => res.json(err));
  },
  };

module.exports = thoughtController;