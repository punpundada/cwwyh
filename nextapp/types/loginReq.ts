import * as yup from 'yup'
export const loginSchema = yup.object({
    email:yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please enter correct email').required(),
    password:yup.string().min(6,'Password must be atleas 6 char long').required()
})

export type ILoginReq = yup.InferType<typeof loginSchema>;