import { Types } from 'mongoose';

export type TBooking = {
  'pick-up-date': string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  carId?: string;
  'pick-up-time': string;
  'drop-off-date'?: string;
  'drop-off-time'?: string;
  totalCost: number;
};
