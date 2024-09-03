import { Date, Types } from 'mongoose';

export type TBooking = {
  'pick-up-date': string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  carId?: string;
  status?: 'pending' | 'approved' | 'canceled';
  'pick-up-time': string;
  'drop-off-date'?: string;
  'drop-off-time'?: string;
  totalCost: number;
  tranId: string;
  userEmail: string;
  isPaid: boolean;
  name: string;
  phone: number | string;
  address: string;
  email: string;
  returnedBy: string;
  isReturned: boolean;
  createdAt: Date;
  updatedAt: Date;
};