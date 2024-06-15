import { z } from 'zod';

export const createCarValidationSchema = z.object({
  body:z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    color: z.string().nonempty("Color is required"),
    isElectric: z.boolean().refine(val => val !== undefined, { message: "isElectric is required" }),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()).min(1, "Features are required"),
    pricePerHour: z.number().positive("Price per hour must be a positive number"),
    isDeleted: z.boolean().default(false)
  })
});

export const updateValidationCarSchema = z.object({
 body:z.object({
    name: z.string().nonempty("Name is required").optional(),
    description: z.string().nonempty("Description is required").optional(),
    color: z.string().nonempty("Color is required").optional(),
    isElectric: z.boolean().refine(val => val !== undefined, { message: "isElectric is required" }).optional(),
    status: z.enum(['available', 'unavailable']).default('available').optional(),
    features: z.array(z.string()).min(1, "Features are required").optional(),
    pricePerHour: z.number().positive("Price per hour must be a positive number").optional(),
    isDeleted: z.boolean().default(false).optional(),
 })
});

export const carValidations = {
    createCarValidationSchema,
    updateValidationCarSchema
}
