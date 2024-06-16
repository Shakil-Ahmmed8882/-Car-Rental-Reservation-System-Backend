import { Schema, model } from 'mongoose';
import { TCar, TCarModel } from './car.interface';

const carSchema = new Schema<TCar, TCarModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: {
      type: [String],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


carSchema.statics.isCarExist = async function(id){
  return await CarModel.findById(id)
}



export const CarModel = model<TCar, TCarModel>('Car', carSchema);
