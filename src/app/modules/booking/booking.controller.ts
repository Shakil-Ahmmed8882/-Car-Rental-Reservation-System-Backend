import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { BookingServices } from './booking.service';

const BookCar = catchAsync(async (req, res) => {
  const {email} = req.user
  const result = await BookingServices.BookCarIntoDB(email,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});

// const getSingleUser = catchAsync(async (req, res) => {

//     const result = await UserServices.getSingleUserIntoDB()
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User is retrieved succesfully',
//       data: result,
//     });
// });

// const updateUser = catchAsync(async (req, res) => {

//       const result = await UserServices.updateUserIntoDB()
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User is updated succesfully',
//       data: result,
//     });
// });

export const BookingControllers = {
  BookCar,
  //   getAllUsers,
  //   getSingleUser,
  //   updateUser,
};
