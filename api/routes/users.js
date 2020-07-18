const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const userActivity = require("../middleware/user-activity");
const Users = require('../models/users');

const UserController = require('../controllers/users');

// Create new user
router.post('/signup', UserController.user_signup);
//Login 
router.post('/login', UserController.user_login);
//List all users
router.get('/', UserController.list_users);
//Update user
router.patch('/:_id', userActivity.create_records, UserController.update_user);
//Single user
router.get('/:_id', UserController.get_single_user);
//Delete user
router.delete('/:_id', UserController.delete_user);

module.exports = router;