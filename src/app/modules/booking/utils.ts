import { Types } from "mongoose";
import { BookingModel } from "./booking.model";
import { TBooking } from "./booking.interface";

export const totalSpendingQuery = (userId: Types.ObjectId) => {
  
  return  [
    // Match bookings by user
    {
      $match: {
        user: userId,
      },
    },
    // Lookup the car to get pricePerHour
    {
      $lookup: {
        from: 'cars',
        localField: 'car',
        foreignField: '_id',
        as: 'carDetails',
      },
    },
    // Unwind the carDetails array
    {
      $unwind: '$carDetails',
    },
    // Add fields to calculate the pick-up and drop-off timestamps
    {
      $addFields: {
        pickUpTimestamp: {
          $dateFromString: {
            dateString: {
              $concat: ['$pick-up-date', 'T', '$pick-up-time'],
            },
          },
        },
        dropOffTimestamp: {
          $dateFromString: {
            dateString: {
              $concat: ['$drop-off-date', 'T', '$drop-off-time'],
            },
          },
        },
      },
    },
    // Calculate the duration in hours
    {
      $addFields: {
        durationHours: {
          $divide: [
            { $subtract: ['$dropOffTimestamp', '$pickUpTimestamp'] },
            1000 * 60 * 60, // Convert milliseconds to hours
          ],
        },
      },
    },
    // Calculate the booking cost
    {
      $addFields: {
        bookingCost: {
          $multiply: ['$durationHours', '$carDetails.pricePerHour'],
        },
      },
    },
    // Group by user to sum up the total spending
    {
      $group: {
        _id: '$user',
        totalSpending: { $sum: '$bookingCost' },
      },
    },
  ];
}




// is car already booked with specific time range



export const isCarAlreadyBooked = async (payload:TBooking) => {
  return await BookingModel.findOne({
    car: payload.car,
    $or: [
      {
        // Case 1: New booking pick-up and drop-off are within the range of an existing booking
        $and: [
          { 'pick-up-date': { $lte: payload['pick-up-date'] } },
          { 'drop-off-date': { $gte: payload['pick-up-date'] } },
          {
            $or: [
              // On the same date, check time conflicts
              {
                $and: [
                  { 'pick-up-date': payload['pick-up-date'] },
                  { 'pick-up-time': { $lte: payload['drop-off-time'] } },
                  { 'drop-off-time': { $gte: payload['pick-up-time'] } }
                ]
              },
              // If not the same day, no need to check time overlap
              { 'pick-up-date': { $ne: payload['pick-up-date'] } }
            ]
          }
        ]
      },
      {
        // Case 2: Existing booking falls within the range of the new booking
        $and: [
          { 'pick-up-date': { $gte: payload['pick-up-date'] } },
          { 'drop-off-date': { $lte: payload['drop-off-date'] } }
        ]
      },
      {
        // Case 3: Overlapping range of dates (new booking's range covers existing booking)
        $and: [
          { 'pick-up-date': { $lte: payload['drop-off-date'] } },
          { 'drop-off-date': { $gte: payload['pick-up-date'] } }
        ]
      }
    ]
  });
};


