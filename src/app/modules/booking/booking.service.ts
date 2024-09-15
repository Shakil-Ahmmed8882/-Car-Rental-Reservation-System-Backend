import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { isValidObjectId } from '../../utils';
import { CarModel } from '../car/car.model';
import { UserModel } from '../user/user.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './booking.constant';
// ssl
import { isCarAlreadyBooked, totalSpendingQuery } from './utils';
import { Types } from 'mongoose';


export const BookCarIntoDB = async (email: string, payload: TBooking) => {
  // Check if the user exists
  const user = await UserModel.isUserExist(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Validate carId
  if (!payload.car || !isValidObjectId(payload.car)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Car ID');
  }

  // Check if car exists
  const car = await CarModel.findById(payload.car);
  if (!car) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car not found');
  }


   // Check if the car is already booked
   const existingBooking = await isCarAlreadyBooked(payload);
  
  
  if (existingBooking) {
    throw new AppError(httpStatus.CONFLICT, 'The car is already booked for the selected date range');
  }
  
  payload.user = user?._id
  // Proceed with booking creation
  const result = await BookingModel.create(payload);

  return result

  
};






// ----------------------------






const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(BookingModel.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  console.log(bookingQuery);
  const aggregationPipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'car',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $unwind: '$car',
    },
    {
      $addFields: {
        duration: {
          $let: {
            vars: {
              startDate: {
                $dateFromString: {
                  dateString: {
                    $concat: ['$pick-up-date', 'T', '$pick-up-time'],
                  },
                },
              },
              endDate: {
                $dateFromString: {
                  dateString: {
                    $concat: ['$drop-off-date', 'T', '$drop-off-time'],
                  },
                },
              },
            },
            in: {
              $dateDiff: {
                startDate: '$$startDate',
                endDate: '$$endDate',
                unit: 'minute',
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        duration: {
          $concat: [
            { $toString: { $floor: { $divide: ['$duration', 1440] } } },
            'd ',
            {
              $toString: {
                $mod: [{ $floor: { $divide: ['$duration', 60] } }, 24],
              },
            },
            'h ',
            { $toString: { $mod: ['$duration', 60] } },
            'm',
          ],
        },
      },
    },
  ];

  // Apply the aggregation pipeline
  const result = await BookingModel.aggregate(aggregationPipeline).exec();

  return result;
};

const getMyBookingsFromDB = async (
  email: string,
  query: Record<string, unknown>,
) => {
  // Check if the user exists in the database
  const user = await UserModel.isUserExist(email);
  if (!user) {
    throw new AppError(404, 'Opps! User not found');
  }

  // Check the user by id in bookings collection
  const userId = user._id;

  const bookingQuery = new QueryBuilder(
    BookingModel.find({ user: userId }).populate('user').populate('car'),
    query,
  )
    .search(['status'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;

  // Execute the pipeline
  const totalSpendingPipeline = totalSpendingQuery(userId);
  const totalSpendings = await BookingModel.aggregate(totalSpendingPipeline);

  return { result, totalSpendings };
};
const getSingleBookingFromDB = async (id: string) => {
  if (isValidObjectId(id)) {
    const result = await BookingModel.findById(id).populate('user');
    return result;
  }
};

const updateSingleBookingFromDB = async (
  bookingId: string,
  payload: Partial<TBooking>,
) => {
  // Validate booking ID
  if (!Types.ObjectId.isValid(bookingId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid booking ID!');
  }

  // Find the booking by ID
  const booking = await BookingModel.findById(bookingId);
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
  }

  // Update only the fields specified in the TBooking type
  const updatableFields: (keyof TBooking)[] = [
    'pick-up-date',
    'pick-up-time',
    'drop-off-date',
    'drop-off-time',
    'totalCost',
    'tranId',
    'isPaid',
    'status',
    'name',
    'phone',
    'address',
    'email',
    'isReturned',
    'returnedBy',
  ];

  updatableFields.forEach((field) => {
    if (payload[field] !== undefined) {
      // Ensure TypeScript knows the type of `booking[field]`
      (booking as any)[field] = payload[field];
    }
  });

  // Save the updated booking
  await booking.save();

  // Populate the user and car fields for returning
  const populatedBooking = await BookingModel.findById(booking._id)
    .populate('user')
    .populate('car');

  return populatedBooking;
};

const deleteBookingFromDB = async (bookingId: string) => {
  // Validate booking ID
  if (!Types.ObjectId.isValid(bookingId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid booking ID!');
  }

  const bookingCar = await BookingModel.findById(bookingId);
  await CarModel.findByIdAndUpdate(bookingCar?.car, { status: 'available' });
  const result = await BookingModel.findByIdAndDelete(bookingId);
  return result;
};

export const BookingServices = {
  BookCarIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  getSingleBookingFromDB,
  updateSingleBookingFromDB,
  deleteBookingFromDB,
};
