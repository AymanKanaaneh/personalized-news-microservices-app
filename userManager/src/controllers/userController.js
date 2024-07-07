const registerUser = async (req, res) => {
  try {
    // TODO - should calling user accessor service
    res.status(201).json(user);
  } catch (error) {
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
