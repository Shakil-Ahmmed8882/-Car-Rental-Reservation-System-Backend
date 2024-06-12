

import { Schema, model } from "mongoose"
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
    {}
);

export const User =  model<TUser>('User',userSchema)



