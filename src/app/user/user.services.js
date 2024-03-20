import { LOGGER, logType } from "../../utils/loggerUtil.js"
import { createUserRepo, getUserByUsernameRepo, getUserByUuidRepo, updateUserByUuidRepo } from "./user.repository.js"

export const getUserByUsername = async(data, req_id) => {
    LOGGER(logType.INFO, `Start getUserByUsername`, data, req_id)
    const user = await getUserByUsernameRepo(data.username)

    if (!user) {
        throw Error("Authentication Failed")
    }
    return user
}

export const getUserByUuidService = async (uuid, req_id) => {
    LOGGER(logType.INFO, `Start getUserByUuidService [${uuid}]`, null, req_id)
    const user = await getUserByUuidRepo(uuid)

    if (!user) {
        throw Error("data not found")
    }
    return user
}

export const createUserService = async (userData, req_id) => {
    LOGGER(logType.INFO, `Start createUserService`, userData, req_id)
    const user = await createUserRepo(userData)
    return user
}

export const updateUserByUuidService = async (uuid, userData, req_id) => {
    LOGGER(logType.INFO, `Start updateUserByUuidService [${uuid}]`, userData, req_id)
    await getUserByUuidService(uuid)
    const user = await updateUserByUuidRepo(uuid, userData)
    return user
}