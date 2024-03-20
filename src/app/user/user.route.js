import express from "express"
import { loginUser, postCreateUser, updateUserByUUID } from "./user.handler.js"
import { authTokenMiddleware } from "../../middleware/auth.js"
import { ADMIN_ROLES, USER_ROLES } from "../../utils/rolesUtil.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), postCreateUser)
router.put("/:uuid", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), updateUserByUUID)

export const getUserRoute = () => {
    return {
        controller: router,
        prefix: "/user"
    }
}