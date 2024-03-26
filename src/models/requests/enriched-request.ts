import { UserDTO } from "../dto/UserDTO.model";
import { Request } from "express";

export interface EnrichedRequest extends Request {
  user?: UserDTO;
}
