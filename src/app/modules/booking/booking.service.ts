import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { isValidObjectId } from '../../utils';
import { CarModel } from '../car/car.model';
import { UserModel } from '../user/user.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './booking.constant';

const BookCarIntoDB = async (email: string, payload: TBooking) => {
  // check is the user exist in database
  const user = await UserModel.isUserExist(email);
  if (!user) {
    throw new AppError(404, 'Opps! User not found');
  }

  // cheking is car id valid (1)
  if (typeof payload?.carId !== 'string') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Opps! Invalid Id!');
  }

  // cheking is car id valid (2)
  if (!isValidObjectId(payload?.carId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Opps! Invalid Id!');
  }

  // check is the car exist in database
  const car = await CarModel.findById(payload.carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Opps! Car not found!');
  }

  // check is the car available
  if (car.status !== 'available') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Opps! This Car is not available!',
    );
  }

  // check is the car already booked by same user
  const isBookedBySameUser = await BookingModel.findOne({
    user: user._id,
    car: car._id,
  }).select('_id');
  if (isBookedBySameUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Opps! Already booked!');
  }

  // set user & car id /
  payload.user = user?._id;
  payload.car = car?._id;
  delete payload.carId;

  // all passed_/_/ save into DB
  const result = await BookingModel.create(payload);

  // Populate the user and car fields
  const populatedResult = await BookingModel.findById(result._id)
    .populate('user')
    .populate('car');
  return populatedResult;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    BookingModel.find().populate('user').populate('car'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  return result;
};

const updateSingleBookingFromDB = async () => {};

export const BookingServices = {
  BookCarIntoDB,
  getAllBookingsFromDB,
  updateSingleBookingFromDB,
};
