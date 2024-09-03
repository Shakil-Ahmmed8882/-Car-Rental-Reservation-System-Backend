import { BookingModel } from '../booking/booking.model';
import { CarModel } from '../car/car.model';
import { Response } from 'express';
import { SSLPaymentGateway } from './utils';
import config from '../../config';

const SSLPayment = async (payload:{bookingId:string}, res: Response) => {
  try {
    // Update the document and return the updated document

    console.log(payload)
    const urlAndTransactioId = await SSLPaymentGateway(1000);

    // send this id from front end
    await BookingModel.findByIdAndUpdate(
      payload.bookingId,
      {
        tranId: urlAndTransactioId.tranId,
      },
      { new: true, runValidators: true },
    );

    res.send(urlAndTransactioId);
  } catch (error:any) {
    // Handle errors
    console.error('Error updating booking status:', error.message);
    throw error;
  }
};

const paymentSuccess = async (tranId: string, res: Response) => {
  try {
    // Ensure tranId is provided and is in the correct format
    if (!tranId) {
      throw new Error('Transaction ID is required');
    }

    // Update the document and return the updated document
    const bookedCar = await BookingModel.findOneAndUpdate(
      { tranId },
      { isPaid: true, returnedBy: 'customer'},
      { new: true, runValidators: true },
    );

    // Check if the document was found and updated
    if (!bookedCar) {
      throw new Error('Booking not found');
    }

    const updatedCar = await CarModel.findByIdAndUpdate(
      bookedCar?.car,
      { status: 'unavailable' },
      { new: true, runValidators: true },
    );

    if (updatedCar !== null) {
      res.redirect(`${config.client_url}/payment/success/${tranId}`);
    }

    return bookedCar;
  } catch (error:any) {
    // Handle errors
    console.error('Error updating booking status:', error.message);
    throw error;
  }
};

const paymentFail = async (tranId: string, res: Response) => {
  try {
    // if payment is failed then delete the created booking

    const bookedCar = await BookingModel.findOneAndUpdate(
      { tranId },
      { isPaid: false, tranId: '', returnedBy: '' },
      { new: true, runValidators: true },
    );

    // Check if the document was found and updated
    if (!bookedCar) {
      throw new Error('Booking not found');
    }
    res.redirect(`${config.client_url}/payment/fail/${tranId}`);
  } catch (error:any) {
    // Handle errors
    console.error('Error updating booking status:', error.message);
    throw error;
  }
};

// const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
//   const bookingQuery = new QueryBuilder(
//     BookingModel.find().populate('user').populate('car'),
//     query,
//   )
//     .search(searchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await bookingQuery.modelQuery;
//   return result;
// };

// const getMyBookingsFromDB = async (email: string) => {
//   // check is the user exist in database
//   const user = await UserModel.isUserExist(email);
//   if (!user) {
//     throw new AppError(404, 'Opps! User not found');
//   }

//   //check the user by id in bookings collection
//   const userId = user._id;
//   const myBookings = await BookingModel.find({ user: userId })
//     .populate('user')
//     .populate('car');

//   return myBookings;
// };

// const updateSingleBookingFromDB = async () => {};

export const paymentServices = {
  paymentSuccess,
  paymentFail,
  SSLPayment,
  // getAllBookingsFromDB,
  // getMyBookingsFromDB,
  // updateSingleBookingFromDB,
};
