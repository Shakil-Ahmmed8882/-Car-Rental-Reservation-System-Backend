import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (payload:TCar) => {
    const result = await CarModel.create(payload)
    return result
};
const getAllCarsFromDB = async () => {
  return await CarModel.find()
};
const getSingleCarFromDB = async () => {};
const updateCarIntoDB = async () => {};
const deleteSingleCarFromDB = async () => {};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB
};
