const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {

    userService.registerUser(req.body);

    // TO DO - add logger 
    res.status(201).json(result);
  } catch (error) {

    //TO DO - Handle differnet error status code
    res.status(400).json({ error: error.message });
  }
};
    
const updateUserPreferences = async (req, res) => {
  try {
    // TODO should calling user accessor service
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, updateUserPreferences };
