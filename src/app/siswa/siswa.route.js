import express from "express"
import { deleteSiswaByUUID, getAllSiswas, getSiswaByUUID, postCreateSiswa, updateSiswaByUUID } from "./siswa.handler.js"

const router = express.Router()

router.get("/", getAllSiswas)
router.get("/:uuid", getSiswaByUUID)
router.post("/", postCreateSiswa)
router.put("/:uuid", updateSiswaByUUID)
router.delete("/:uuid", deleteSiswaByUUID)

export const getSiswaRoute = () => {
    return {
        controller: router,
        prefix: "/siswa"
    }
}