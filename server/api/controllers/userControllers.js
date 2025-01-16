const User = require('../models/User');

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists!' });
    }
    const result = await User.create(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // get admin
// const getAdmin = async (req, res) => {
//   const email = req.params.email;
//   const query = { email: email };

//   try {
    
//     if (!req.decoded || !req.decoded.email) {
//       return res.status(401).send({ message: 'Unauthorized access' });
//     }
//     if (email !== req.decoded.email) {
//       return res.status(403).send({ message: 'Forbidden access' });
//     }
//     const user = await User.findOne(query);
//     let admin = false;
//     if (user) {
//       admin = user?.role === 'admin';
//     }
//     res.status(200).json({ admin });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };

  try {
    // Log key details for debugging
    console.log('Query:', query);
    console.log('Params email:', email);
    console.log('Decoded email:', req.decoded?.email);

    // Ensure `req.decoded.email` is available
    if (!req.decoded || !req.decoded.email) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    // Check if the email matches the decoded email
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }

    // Find the user in the database
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the user has an admin role
    const admin = user.role === 'admin';

    res.status(200).json({ admin });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching admin status:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// make admin
const makeAdmin = async (req, res) => {
  const userId = req.params.id; // Use id as the route parameter
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
};
