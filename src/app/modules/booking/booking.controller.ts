import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { BookingServices } from './booking.service';

const BookCar = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookingServices.BookCarIntoDB(email, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings are retrieved succesfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.updateSingleBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});

export const BookingControllers = {
  BookCar,
  getAllBookings,
  updateUser: updateBooking,
};
