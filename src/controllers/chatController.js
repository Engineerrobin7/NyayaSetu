exports.sendMessage = (req, res) => {
  const { question } = req.body;

  if (!question) {
      return res.status(400).json({ error: "Question is required!" });
  }

  // Simulate AI response (Replace with actual AI integration)
  const aiResponse = `🤖 AI says: I received your question - "${question}"`;

  res.json({ answer: aiResponse });
};
