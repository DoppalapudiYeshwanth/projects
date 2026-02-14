const People = require("../models/peopleSchema");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Candidate = require("../models/candidateSchema");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


const registerCandidate = async (req, res, next) => {
  try {
    const { name, email, password, phone, skills } = req.body;
    const existingUser = await People.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    let resumeUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "resumes",
        resource_type: "raw",
        use_filename: true,
        unique_filename: true,
      });
      resumeUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }


    const newUser = new People({
      name,
      email,
      password,
      role: "candidate",
    });

    await newUser.save();

    await Candidate.create({
      userId: newUser._id,
      name,
      email,
      phone,
      resumeUrl,
      skills: skills.split(",").map((s) => s.trim()),
      createdAt: new Date(),
    });
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

const registerHR = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await People.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newHR = new People({
      name,
      email,
      password,
      role: "hr",
    });

    await newHR.save();

    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await People.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials");

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).send("Invalid credentials");

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
    });

    if (user.role === "hr") return res.redirect("/hr/dashboard");
    res.redirect("/candidate/dashboard");
  } catch (err) {
    next(err);
  }
};

module.exports = { registerCandidate,registerHR, loginUser };
