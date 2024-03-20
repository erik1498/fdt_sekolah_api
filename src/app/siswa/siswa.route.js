import express from "express"
import { deleteSiswaByUUID, getAllSiswas, getSiswaByUUID, postCreateSiswa, updateSiswaByUUID } from "./siswa.handler.js"
import { authTokenMiddleware } from "../../middleware/auth.js"
import { ADMIN_ROLES, USER_ROLES } from "../../utils/rolesUtil.js"

const router = express.Router()

router.get("/", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), getAllSiswas)

router.get("/:uuid", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), getSiswaByUUID)
router.post("/", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), postCreateSiswa)
router.put("/:uuid", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), updateSiswaByUUID)
router.delete("/:uuid", authTokenMiddleware(
    [
        ADMIN_ROLES,
        USER_ROLES
    ]
), deleteSiswaByUUID)

export const getSiswaRoute = () => {
    return {
        controller: router,
        prefix: "/siswa"
    }
}