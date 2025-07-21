// server/controllers/feedbackController.js
const Feedback = require('../models/Feedback'); // Import the Feedback model

exports.sendFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new feedback instance using our model
    const newFeedback = new Feedback({
      name,
      email,
      message,
    });

    // Save the new feedback to the database
    await newFeedback.save();

    res.status(200).json({ msg: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).send('Server Error');
  }
};
