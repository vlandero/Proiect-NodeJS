import { Response, NextFunction } from "express";
import { EnrichedRequest } from "../models/requests/enriched-request";
import { z } from "zod";

export const validateSchema = <T extends z.ZodSchema<any>>(schema: T) => {
  return (req: EnrichedRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (err: any) {
      return res
        .status(400)
        .send({ message: "Invalid request body" + err.message });
    }
  };
};