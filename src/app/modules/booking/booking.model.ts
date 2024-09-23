  import { Schema, model } from 'mongoose';
  import { TBooking } from './booking.interface';

  // Define the schema for the booking
  const bookingSchema = new Schema<TBooking>(
    {
      'pick-up-date': {
        type: String,
        required: true,
        validate: {
          validator: (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v),
          message: (props) =>
            `${props.value} is not a valid date format (YYYY-MM-DD)!`,
        },
      },
      'drop-off-date': {
        type: String,
        validate: {
          validator: (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v),
          message: (props) =>
            `${props.value} is not a valid date format (YYYY-MM-DD)!`,
        },
      },
      'pick-up-time': {
        type: String,
        required: true,
        validate: {
          validator: (v: string) =>
            /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v),
          message: (props) =>
            `${props.value} is not a valid time format (HH:MM:SS)!`,
        },
      },
      'drop-off-time': {
        type: String,
        validate: {
          validator: (v: string) =>
            /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v),
          message: (props) =>
            `${props.value} is not a valid time format (HH:MM:SS)!`,
        },
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'canceled'],
        default: 'pending',
      },
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      totalCost: {
        type: Number,
        required: true,
        default: 0,
      },
      tranId: {
        type: String,
        default: '',
      },
      isPaid: {
        type: Boolean,
        default: false,
      },

      isReturned: {
        type: Boolean,
        default: false,
      },
      returnedBy: {
        type: String,
        enum: ['customer', 'admin', 'user', ''],
        default: 'customer',
      },

      // Add timestamps if needed
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true, // Automatically manage createdAt and updatedAt fields
    },
  );

  export const BookingModel = model<TBooking>('Booking', bookingSchema);
