const express = require('express');

const controllers = require('../controllers/users');

const router = express.Router();


// GETS BACK ALL THE USERS
router.get('/users', controllers.getUsers);

//GET SPECIFIC USER
router.get('/users/:userId',controllers.getUser);

// POST AN USER
router.post('/users',controllers.postUser);

//DELETE AN USER
router.delete('/users/:userId',controllers.deleteUser);

//UPDATE AN USER
router.put('/users/:userId',controllers.updateUser);

module.exports = router;

