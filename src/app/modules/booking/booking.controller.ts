import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { BookingServices } from './booking.service';

const BookCar = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookingServices.BookCarIntoDB(email, req.body);
  res.send(result);
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req?.query);

  // if no data found
  if (result.length <= 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings are retrieved succesfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookingServices.getMyBookingsFromDB(email, req.query);

  //if no data found
  if (result.result.length <= 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings are retrieved succesfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const {id} = req.params
  console.log(id)
  const result = await BookingServices.getSingleBookingFromDB(id);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is retrieved succesfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const result = await BookingServices.updateSingleBookingFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking is updated succesfully',
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  const result = await BookingServices.deleteBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking is deleted succesfully',
    data: result,
  });
});

export const BookingControllers = {
  BookCar,
  getAllBookings,
  getMyBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking
};
