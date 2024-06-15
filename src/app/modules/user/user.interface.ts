import { Document, Model } from 'mongoose';
import USER_ROLE from './user.constant';





export interface TUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
  phone: string;
  address: string;
}

// Define an interface that extends TUser but makes password optional
export interface SafeTUser extends Omit<TUser, 'password'> {
  password?: string;
}

// user role type
export type TUerRole = keyof typeof USER_ROLE 


export interface TUserDocument extends TUser, Document {}

export interface TUserModel extends Model<TUserDocument> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(email: string): Promise<TUserDocument | null>;
}
