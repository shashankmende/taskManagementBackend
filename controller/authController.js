
const userModel = require('../model/userModel')
const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt')

const manualSignUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ 
            email, 
            password: hashedPassword,
            authProvider: 'local'
        });

        await newUser.save();
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const manualLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("request boyd",req.body)

    try {
        const user = await userModel.findOne({ email, authProvider: 'local' });

        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const isPasswordValid =  bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const token = await jwt.sign()
        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

//social media login/signup
const socialLoginSignup = async (req, res) => {
    const { email, firstName, lastName, picture, authProvider } = req.body;
  
    try {
      // Check if a user with this email already exists
      let user = await userModel.findOne({ email });
  
      if (user) {
        // If the user exists, and the authProvider matches, return the existing user
        if (user.authProvider === authProvider) {
          return res.status(200).send({ message: 'Login successful', user });
        } else {
          // If the email exists but with a different provider, handle accordingly
          return res.status(400).send({ error: 'Email is already registered with another provider.' });
        }
      }
  
      // If no user exists, create a new one
      user = new userModel({
        email,
        firstName,
        lastName,
        picture,
        authProvider,
      });
  
      await user.save();
      res.status(201).send({ message: 'Signup successful', user });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  


  //update profile
  const updateUserProfile = async (req, res) => {
    const { email, ...updateData } = req.body;

    try {
        const updatedUser = await userModel.findOneAndUpdate({ email }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};



module.exports  = {
    manualSignUp,
    manualLogin,
    socialLoginSignup,
    updateUserProfile
    
}