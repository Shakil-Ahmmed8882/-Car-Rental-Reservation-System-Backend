
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
    
    const result = await UserServices.createUserIntoDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    
    const result = await UserServices.getAllUsersIntoDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    });
});

const getSingleUser = catchAsync(async (req, res) => {
    
    const result = await UserServices.getSingleUserIntoDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is retrieved succesfully',
      data: result,
    });
});

const updateUser = catchAsync(async (req, res) => {
    
      const result = await UserServices.updateUserIntoDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is updated succesfully',
      data: result,
    });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};

