import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const register = async (req, res) => {
  try {
    const { email, password, role, nom } = req.body;
    const user = await User.create({ email, password, role, nom });
    const data = user.get({ plain: true });
    delete data.password;
    return res.status(201).json(data);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const me = (req, res) => {
  // req.user comes from authenticate middleware and contains decoded payload
  return res.json(req.user);
};
