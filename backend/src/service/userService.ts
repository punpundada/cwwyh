import User from "../models/UserModel"

export const getUserDataById = async (id:string) => {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.error(error)
        return
    }
}