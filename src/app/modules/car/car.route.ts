import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { carValidations } from "./car.validation";
import auth from "../../middlewares/auth";
import USER_ROLE from "../user/user.constant";
import { CarControllers } from "./car.controller";

const router = Router()

router.post('/', auth(USER_ROLE.admin), validateRequest(carValidations.createCarValidationSchema),CarControllers.CreateCar)
router.get('/', CarControllers.getAllCars)
router.get('/:id', CarControllers.getSingleCar)
// return car
router.put('/return',auth(USER_ROLE.admin),validateRequest(carValidations.returnCarValidationSchema), CarControllers.returnCar)

router.put('/:id',auth(USER_ROLE.admin),validateRequest(carValidations.updateValidationCarSchema), CarControllers.updateCar)
router.delete('/:id', CarControllers.deleteCar)


export const carRoutes = router