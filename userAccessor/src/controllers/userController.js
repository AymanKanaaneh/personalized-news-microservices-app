const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body); 
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
    
const updateUserPreferences = async (req, res) => {
  try {
    user = await userService.updateUserPreferences(req.params.userId, req.body.preferences);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, updateUserPreferences };
