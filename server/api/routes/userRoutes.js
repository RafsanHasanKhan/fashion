const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

const verifyToken = require('../../middlewares/authMiddleware');
const verifyAdmin = require('../../middlewares/verifyAdmin')

// Get all users
router.get('/',verifyToken, verifyAdmin, userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

// Delete a user by ID
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);

// Get admin status by email
router.get('/admin/:email', verifyToken, userController.getAdmin);

// Make a user admin by ID
router.patch('/admin/:id', verifyToken, verifyAdmin, userController.makeAdmin);

module.exports = router;
