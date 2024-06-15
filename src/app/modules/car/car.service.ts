import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (payload:TCar) => {
    const result = await CarModel.create(payload)
    return result
};
const getSingleCarFromDB = async () => {};
const getAllCarsFromDB = async () => {};
const updateCarIntoDB = async () => {};
const deleteSingleCarFromDB = async () => {};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteSingleCarFromDB
};
