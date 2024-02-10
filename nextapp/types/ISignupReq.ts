import * as yup from 'yup'

export const signupSchema = yup.object({
    firstName:yup.string().required('Please enter first name'),
    lastName:yup.string().required('Please enter last name'),
    email:yup.string().email('Email should be valid').required('Please enter email'),
    password:yup.string().min(6,'Password should be more than 6 characters').required('Please enter password')
})

export type ISignupReq = yup.InferType<typeof signupSchema>