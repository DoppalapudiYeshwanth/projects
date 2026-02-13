const People = require("../models/peopleSchema");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await People.findOne({ email });
    if (existing) {
      return res.status(400).send("User already exists");
    }

    const people = new People({
      name,
      email,
      password,
      role,
    });

    await people.save();

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

module.exports = { registerUser, loginUser };
