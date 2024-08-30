import { Types } from "mongoose";

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