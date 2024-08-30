import catchAsync from '../../utils/catchAsync';

import { paymentServices } from './payment.service';

const SSLPaymentHandler = catchAsync(async (req, res) => {
  await paymentServices.SSLPayment(req.body,res);
});

const paymentSuccessHandler = catchAsync(async (req, res) => {
  const transectionId = req.params.tranId;
  await paymentServices.paymentSuccess(transectionId, res);
});

const paymentFailHandler = catchAsync(async (req, res) => {
  const transectionId = req.params.tranId;
  await paymentServices.paymentFail(transectionId, res);
});

// const getAllBookings = catchAsync(async (req, res) => {
//   const result = await BookingServices.getAllBookingsFromDB(req?.query);

//   // if no data found
//   if(result.length <= 0){
//     sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.NOT_FOUND,
//       message: 'No Data Found',
//       data: result,
//     });

//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Bookings are retrieved succesfully',
//     data: result,
//   });

// });

// const getMyBookings = catchAsync(async (req, res) => {
//   const {email} = req.user
//   const result = await BookingServices.getMyBookingsFromDB(email);

// // if no data found
// if(result.length <= 0){
//   sendResponse(res, {
//     success: false,
//     statusCode: httpStatus.NOT_FOUND,
//     message: 'No Data Found',
//     data: result,
//   });

// }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'My Bookings are retrieved succesfully',
//     data: result,
//   });
// });

// const updateBooking = catchAsync(async (req, res) => {
//   const result = await BookingServices.updateSingleBookingFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User is updated succesfully',
//     data: result,
//   });
// });

export const paymentControllers = {
  SSLPaymentHandler,
  paymentSuccessHandler,
  paymentFailHandler
  // getAllBookings,
  // getMyBookings,
  // updateBooking,
};
