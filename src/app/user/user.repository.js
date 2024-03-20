import UserModel from "./user.model.js";

export const getUserByUsernameRepo = async (username) => {
    const user = await UserModel.findOne({
        where:{
            username
        }
    })
    return user
}

export const getUserByUuidRepo = async (uuid) => {
    const user = await UserModel.findOne({
        where:{
            uuid
        }
    })
    return user
}

export const createUserRepo = async (userData) => {
    const user = await UserModel.create({
        username: userData.username,
        password: userData.password,
        name: userData.name,
        role: userData.role,
    })
    return user
}

export const updateUserByUuidRepo = async (uuid, userData) => {
    const user = await UserModel.update({
        username: userData.username,
        password: userData.password,
        name: userData.name,
        role: userData.role,
    }, {
        where: {
            uuid
        }
    })
    return user
}