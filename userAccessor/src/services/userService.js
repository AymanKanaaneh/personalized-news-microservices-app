const User = require('../models/user');

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error('User creation failed');
  }
};

const updateUserPreferences = async (userPreferencesPayload) => {
  try {
    console.log('Payload:', userPreferencesPayload);

    const updatedUser = await User.findOneAndUpdate(
      { email: userPreferencesPayload.email },
      { preferences: userPreferencesPayload.preferences },
      { new: true }
    );

    if (!updatedUser) {
      console.log('No user found with this email:', userPreferencesPayload.email);
      return null;
    }

    console.log('Updated User:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

module.exports = { createUser, updateUserPreferences };
