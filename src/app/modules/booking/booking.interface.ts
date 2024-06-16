import { Date, Types } from 'mongoose';

export type TBooking = {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  carId?: string;
  startTime: string;
  endTime: string;
  totalCost: number;
};
