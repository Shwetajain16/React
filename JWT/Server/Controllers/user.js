import bcrypt from "bcryptjs";
import user from "../Model/user.js";
import jwt from "jsonwebtoken";
const secret = "test";

export const signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    const oldUser = await user.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      name: `${firstname} ${lastname}`,
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h"
    });

    res.status(201).json({ result, token, message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const oldUser = await user.findOne({ username });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.username, id: oldUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
