import config from "../../config";
import AppError from "../../errors/AppError";
import { SafeTUser, TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// Signup 
const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const resultObject:SafeTUser = result.toObject({versionKey:false})

  delete resultObject?.password 
  return resultObject;
};

// Signin
const loginUserIntoDB = async (payload: { email: string, password: string }) => {
  const user = await UserModel.isUserExist(payload.email);

  if (!user) {
    throw new AppError(404, 'Oops! User not found');
  }
  
  // Check if the password matched 
  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(404, 'Oops! Invalid password');
  }

  const jwtPayload = {
    email: user.email,
    role: user?.role
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

  if (!token) {
    throw new AppError(500, 'Oops! Something went wrong during generating token. Try again.');
  }

  // Convert Mongoose document to plain object
  const userObj = user?.toObject();

  // Destructure to remove password
  const { password,__v, ...restUserFields } = userObj;


  return { data: restUserFields, token };
};

export const authServices = {
  createUserIntoDB,
  loginUserIntoDB
};