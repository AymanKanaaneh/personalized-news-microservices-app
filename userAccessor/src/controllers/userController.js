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

    console.log(req.body);
    updatedUserPreferences = await userService.updateUserPreferences(req.body);
    res.status(200).json(updatedUserPreferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, updateUserPreferences };
