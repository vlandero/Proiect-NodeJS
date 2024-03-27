import { Response } from "express";
import { User } from "../models/db/User.model";
import { EnrichedRequest } from "../models/requests/enriched-request";

export const deleteUser = async (req: EnrichedRequest, res: Response) => {
  try {
    const id = req.user?.id;
    const user = await User.destroy({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
