import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router()

router.post('/create-admin',
    validateRequest(UserValidations.createUserValidationSchema),        
        UserControllers.createUser
)

router.get('/:id',UserControllers.getSingleUser)
router.get('/',UserControllers.getAllUsers)
router.patch('/:id',UserControllers.updateUser)


export const UserRoutes = router

