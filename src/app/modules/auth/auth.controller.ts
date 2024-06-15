import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

// SIGN UP 
const createUser = catchAsync(async (req, res) => {  
    const result = await authServices.createUserIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
});

//SIGN IN 
const loginUser = catchAsync(async (req, res) => {  
    const {data,token} = await authServices.loginUserIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in  succesfully',
      data,
      token
    });
});


export const authContollers = {
    createUser,
    loginUser
}