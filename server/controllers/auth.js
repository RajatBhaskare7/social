import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    console.log(req.body,"req.body");
    const salt = await bcrypt.genSalt();
    console.log(salt,"salt");
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);


    const result = await User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile:Math.floor(Math.random() * 10000),
        impressions:Math.floor(Math.random() * 10000),
    });
    console.log(result);
    const savedUser = await result.save();
    console.log(savedUser);
    res.status(201).json(savedUser);



  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


/* login */

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body,"req.body")
        const user = await User.findOne({
            email: email,
        });
        console.log(user,"user");
        if (!user) return res.status(400).json({ message: "User doesn't exist" });
        // const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // console.log(isPasswordCorrect);
        // if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentialss" });

        const ismatch = await bcrypt.compare(password, user.password);
        console.log(ismatch);
        if (!ismatch) return res.status(400).json({ message: "Invalid credentials" });



        const token = jwt.sign({id:User._id}, process.env.JWT_SECRET);
        console.log(token);
        delete user.password;
        res.status(200).json({ token,user});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
