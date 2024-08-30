// import { Schema, model } from 'mongoose';
// import { TBooking } from './payment.interface';

// const bookingSchema = new Schema<TBooking>({
//   "pick-up-date": {
//     type: String,
//     required: true,
//     validate: {
//       validator: (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v),
//       message: (props) => `${props.value} is not a valid date format (YYYY-MM-DD)!`,
//     },
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   car: {
//     type: Schema.Types.ObjectId,
//     ref: 'Car',
//     required: true,
//   },
//   "pick-up-time": {
//     type: String,
//     required: true,
//     validate: {
//       validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v),
//       message: (props) => `${props.value} is not a valid time format (HH:MM:SS)!`,
//     },
//   },
//   "drop-off-date": {
//     type: String,
//     validate: {
//       validator: (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v),
//       message: (props) => `${props.value} is not a valid date format (YYYY-MM-DD)!`,
//     },
//   },
//   "drop-off-time": {
//     type: String,
//     validate: {
//       validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(v),
//       message: (props) => `${props.value} is not a valid time format (HH:MM:SS)!`,
//     },
//   },
//   totalCost: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// });

// export const BookingModel = model<TBooking>('Payment', bookingSchema);
