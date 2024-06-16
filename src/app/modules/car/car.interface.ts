import { Document, Model } from "mongoose";


export type TCar = {
    name:string;
    description:string;
    color:string;
    isElectric:boolean;
    status:'available' | 'unavailable';
    features:string[];
    pricePerHour:number;
    isDeleted:boolean;
}



export type TReturnCar = {
    bookingId: string;
    endTime: string;
  };
  

// extend all type from mongose Document 
export interface TCarDocument extends TCar, Document {}
export interface TCarModel extends Model<TCarDocument>{

    // is this car exist in DB 
    // eslint-disable-next-line no-unused-vars
    isCarExist(id:string):Promise<TCarDocument | null>

}

