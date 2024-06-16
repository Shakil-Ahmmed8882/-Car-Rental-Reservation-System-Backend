import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { isValidObjectId } from "../../utils";
import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (payload:TCar) => {
    const result = await CarModel.create(payload)
    return result
};
const getAllCarsFromDB = async () => {
  return await CarModel.find()
};
const getSingleCarFromDB = async (id:string) => {
  
  // check valid id
  if(!isValidObjectId(id)){
    throw new AppError(httpStatus.BAD_REQUEST,'Opps! Invalid id ')
  }
  // check is this car exist in database
  const car = await CarModel.isCarExist(id)
  if(!car){
    throw new AppError(httpStatus.NOT_FOUND,'Opps! not found')
  }
  
  return car

};

const updateCarIntoDB = async () => {};
const deleteSingleCarFromDB = async () => {};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB
};
