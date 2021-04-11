const router = require('express').Router();
const {  
    getAllThought, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought,
    addReaction,
    deleteReaction
 } = require('../../controllers/thought-controller');


// /api/Thoughts/<ThoughtId>
// router.route('/:thoughtId').post(addThought);

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

//Set up GET one, PUT and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

    module.exports = router;