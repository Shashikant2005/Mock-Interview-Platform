const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { clerkUserId } = req.body;

  if (!clerkUserId) {
    return res.status(400).json({ error: "clerkUserId is required" });
  }

  try {
    const existingUser = await User.findOne({ clerkUserId });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = new User({ clerkUserId });
    await newUser.save();

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
