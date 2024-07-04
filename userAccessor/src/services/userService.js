const User = require('../models/user');

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUserPreferences = async (userId, preferences) => {
  return await User.findByIdAndUpdate(userId, { preferences }, { new: true });
};

module.exports = { createUser, updateUserPreferences };
