import express from "express"
import { loginUser, postCreateUser, updateUserByUUID } from "./user.handler.js"

const router = express.Router()

router.post("/", postCreateUser)
router.post("/login", loginUser)
router.put("/:uuid", updateUserByUUID)

export const getUserRoute = () => {
    return {
        controller: router,
        prefix: "/user"
    }
}