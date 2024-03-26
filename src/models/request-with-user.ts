import { UserDTO } from "./dto/UserDTO.model";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: UserDTO;
}
