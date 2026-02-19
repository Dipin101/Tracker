const getQuote = async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/today");
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Failed to fetch quote:", err);
    res.status(500).json({ message: "Failed to fetch quote" });
  }
};
module.exports = getQuote;
