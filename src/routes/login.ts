import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/db/User.model";

const SECRET_KEY = process.env.JWT_SECRET!;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, admin: user.admin }, SECRET_KEY);

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
