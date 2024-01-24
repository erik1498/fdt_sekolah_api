import { siswaValidation } from "./siswa.validation.js"
import { createSiswaService, deleteSiswaByUuidService, getAllSiswaService, getSiswaByUuidService, updateSiswaByUuidService } from "./siswa.services.js"
import { generateValidationMessage } from "../../utils/validationUtil.js"
import { LOGGER, logType } from "../../utils/loggerUtil.js"

export const getAllSiswas = async (req, res) => {
    LOGGER(logType.INFO, "Start getAllSiswaController", null, req.id)
    try {
        const siswas = await getAllSiswaService(req.query, req.id)
        res.json({
            data: siswas,
            message: "Get Data Success"
        })
    } catch (error) {    
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(500).json({
            type: "internalServerError",
            message: error.message
        })
    }
}

export const getSiswaByUUID = async (req, res) => {
    LOGGER(logType.INFO, "Start getSiswaByUuidController", null, req.id)
    try {
        const { uuid } = req.params

        res.json({
            data: await getSiswaByUuidService(uuid, req.id),
            message: "Get Data By UUID Success"
        })
    } catch (error) {
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(500).json({
            type: "internalServerError",
            message: error.message
        })
    }
}

export const postCreateSiswa = async (req, res) => {
    LOGGER(logType.INFO, "Start createSiswaController", null, req.id)
    try {
        const siswaData = req.body
        const { error, value } = siswaValidation(siswaData)
        if (error) {
            return res.status(400).json({
                type: "validationError",
                message: generateValidationMessage(error)
            })
        }
        const siswa = await createSiswaService(value, req.id)
        res.json({
            data: siswa,
            message: "Create data Success"
        })
    } catch (error) {
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(500).json({
            type: "internalServerError",
            message: error.message
        })
    }
}

export const deleteSiswaByUUID = async (req, res) => {
    LOGGER(logType.INFO, "Start deleteSiswaByUuidController", null, req.id)
    try {
        const { uuid } = req.params
        await deleteSiswaByUuidService(uuid, req.id)
        res.status(200).json({
            message: "Delete Success"
        })
    } catch (error) {
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(500).json({
            type: "internalServerError",
            message: error.message
        })
    }
}

export const updateSiswaByUUID = async (req, res) => {
    LOGGER(logType.INFO, "Start updateSiswaByUuidController", null, req.id)
    try {    
        const siswaData = req.body
        const { error, value } = siswaValidation(siswaData)
        if (error) {
            return res.status(400).json({
                type: "validationError",
                message: generateValidationMessage(error)
            })
        }
        await updateSiswaByUuidService(req.params.uuid, value, req.id)
        return res.status(200).json({
            message: "Update Success"
        })
    } catch (error) {
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(500).json({
            type: "internalServerError",
            message: error.message
        })
    }
}