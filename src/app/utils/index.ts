import mongoose from "mongoose";

// check is mongodb valid object id
export const isValidObjectId = (id:any) => {
  return mongoose.Types.ObjectId.isValid(id);
};


