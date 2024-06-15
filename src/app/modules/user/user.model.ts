
import { Schema, model } from "mongoose"
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const userSchema = new Schema<TUser>(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        
        role:{
            type:String,
            enum:['admin', 'user'],
            default:'user'
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },

    }
);

// Hash the password & check duplicate user 
userSchema.pre('save', async function (next) {

    // check if user exist with same email
    const isUserExistWithSameEmail = await UserModel.findOne({email:this.email}).select('email')
    if(isUserExistWithSameEmail){
        throw new AppError(httpStatus.BAD_REQUEST,'Opps! This user already exist.  ')
    }
    

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  });

// Empty the password 
userSchema.post('save', async function (user,next) {
    user.password = ''
    next();
  });


export const UserModel =  model<TUser>('User',userSchema)



