import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { isValidObjectId } from '../../utils';
import { TCar, TReturnCar } from './car.interface';
import { CarModel } from './car.model';
import { BookingModel } from '../booking/booking.model';
import { calculateTotalCost } from './car.utils';

const createCarIntoDB = async (payload: TCar) => {
  const result = await CarModel.create(payload);
  return result;
};

// return car
const returnCarIntoDB = async (payload: TReturnCar) => {
  const id = payload?.bookingId;

  if (!isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Opps!! Invalid Id');
  }

  // find the booked car by id & check is exist
  const bookedCar = await BookingModel.findById(id)
    .populate('user')
    .populate('car')
    .lean();

  if (!bookedCar) {
    throw new AppError(404, 'Opps! Not found');
  }

  // get start , end time & price per hour
  const startTime = bookedCar?.startTime as string;
  const endTime = payload?.endTime;
  const car = await CarModel.findById(bookedCar?.car);
  const pricePerHour = car?.pricePerHour as number;

  // get total cost
  const totalCost = calculateTotalCost(startTime, endTime, pricePerHour);

  // update total cost
  await BookingModel.findByIdAndUpdate(id, { totalCost,endTime });

  const result = await BookingModel.findById(id)
    .populate('user')
    .populate('car');

  return result;
};

const getAllCarsFromDB = async () => {
  return await CarModel.find({isDeleted:false});
};
const getSingleCarFromDB = async (id: string) => {
  // check valid id
  if (!isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Opps! Invalid id ');
  }
  // check is this car exist in database
  const car = await CarModel.isCarExist(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Opps! not found');
  }

  return car;
};

const updateCarIntoDB = async (id: string, payload: TCar) => {
  // check valid id
  if (!isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Opps! Invalid id ');
  }
  // check is this car exist in database
  const car = await CarModel.isCarExist(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Opps! not found');
  }

  const result = await CarModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  // check valid id
  if (!isValidObjectId(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Opps! Invalid id ');
  }

  const result = await CarModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  returnCarIntoDB,

  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB,
};
