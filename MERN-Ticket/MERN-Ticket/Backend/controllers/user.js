import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import UserModal from "../models/user.js";
const secret = process.env.SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPswCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPswCorrect) return res.status(400).json({ message: "Invalid Password" });
    console.log(res.json)
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "2h" });
    
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log(message)
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {

  const { email, password, phone, name } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already available" });

    const hashedPsw = await bcrypt.hash(password, 12);
    const result = await UserModal.create({ email:email, password: hashedPsw, name: name,phone:phone });
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "2h" } );
    
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
