import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router()

 // sign up & sign in structured in auth modules
 // here only read and update APIs
router.get('/:id',UserControllers.getSingleUser)
router.get('/',UserControllers.getAllUsers)
router.patch('/:id',UserControllers.updateUser)


export const UserRoutes = router

