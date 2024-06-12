
import { z } from "zod";


const createUserValidationSchema = z.object({
    body:z.object({})
});


export const UserValidations = {
    createUserValidationSchema
}






