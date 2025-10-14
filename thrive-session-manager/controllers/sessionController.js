const Session = require("../Models/Session");

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create({
      ...req.body,
      coverImage: req.file?.path || null,
      createdBy: req.user.id,
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    const updated = await Session.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteSession = async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};