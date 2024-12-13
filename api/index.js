const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const User = require("./models/userModel");
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Email Sending Function
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "derickgreen18@gmail.com", // Replace with your email
        pass: "ennk avlg hjlq ovnc", // Replace with your email password or app-specific password
      },
    });

    const mailOptions = {
      from: "no-reply@reactnative.com", // Use a valid email address
      to: email,
      subject: "Verify your email",
      text: `Please click on the link to verify your email: http://localhost:8000/verify/${verificationToken}`,
    };
// send email
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.log("Error sending verification email:", error);
  }
};

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const hashedPassword = crypto.createHmac("sha256", password).digest("hex");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Generate and store the verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    newUser.verificationToken = verificationToken;

    // Save the user to the database
    await newUser.save();

    // Send the verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "User registered. Please verify your email." });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//endpoint to verrify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
        // find the user with the given verification token

    const user = await User.findOne({ verificationToken: token});
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }
// mark the user as verified
    user.verificationToken = undefined;
    user.verified = true;
    await user.save();
    res.status(200).json({ message: "Email verified succesfuly" });
    
  } catch (error) {
    res.status(500).json({message:"Email verification failed"});
    
  }

})

const generateSecretKey = () =>{
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
}

const secretKey = generateSecretKey();

//endpont to login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // check if the password is corrcet
    if(user.password !== password){
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //generate a token
const token = jwt.sign({userId:user._id},secretKey)
res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
    
  }

})
