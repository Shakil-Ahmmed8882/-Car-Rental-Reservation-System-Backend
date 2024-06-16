import { model } from 'mongoose';
import { Schema } from 'mongoose';
import { TBooking } from './booking.interface';


const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
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
  startTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v:string) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 24-hour time format!`,
    },
  },
  endTime: {
    type: String || null,
    default:null
  },
  totalCost: {
    type: Number,
    default: 0,
  },
});

export const BookingModel = model<TBooking>('Booking', bookingSchema);
