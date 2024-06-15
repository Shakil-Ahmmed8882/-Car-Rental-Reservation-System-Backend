import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./auth.validation";
import { authContollers } from "./auth.controller";

const router = Router()



router.post('/signup',
    validateRequest(UserValidations.createUserValidationSchema),        
    authContollers.createUser
)

router.post('/signin',
    validateRequest(UserValidations.loginValidationSchema),        
    authContollers.loginUser
)

export const authRoutes = router