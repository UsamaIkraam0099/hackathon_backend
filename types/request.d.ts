import { Request } from "express";

// others
import { UserDocument } from "../src/models/userModel";

declare interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}
