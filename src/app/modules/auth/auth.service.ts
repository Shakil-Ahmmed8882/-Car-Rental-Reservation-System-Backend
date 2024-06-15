import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";

// Sign up 
const createUserIntoDB = async (payload: TUser) => {
    const result = await UserModel.create(payload)
    return result
  };
  

  export const authServices = {
    createUserIntoDB
  }