import { userValidation } from "./user.validation.js"
import { createUserService, getUserByUsername, updateUserByUuidService } from "./user.services.js"
import { generateValidationMessage } from "../../utils/validationUtil.js"
import { LOGGER, logType } from "../../utils/loggerUtil.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

dotenv.config()

export const loginUser = async (req, res) => {
    LOGGER(logType.INFO, "Start loginUser", req.body, req.id)
    try {
        let { username, password } = req.body

        let user = await getUserByUsername({
            username
        }, req.id)

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({
            userId: user.uuid,
            userRole: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const refreshToken = jwt.sign({
            userId: user.uuid
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token, refreshToken });
    } catch (error) {
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(401).json({
            message: error.message
        })
    }
}

export const postCreateUser = async (req, res) => {
    LOGGER(logType.INFO, "Start createUserController", null, req.id)
    try {
        const userData = req.body
        const { error, value } = userValidation(userData)
        if (error) {
            return res.status(400).json({
                type: "validationError",
                message: generateValidationMessage(error)
            })
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);
        value.password = hashedPassword

        const user = await createUserService(value, req.id)
        res.json({
            data: user,
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

export const updateUserByUUID = async (req, res) => {
    LOGGER(logType.INFO, "Start updateUserByUuidController", null, req.id)
    try {
        const userData = req.body
        const { error, value } = userValidation(userData)
        if (error) {
            return res.status(400).json({
                type: "validationError",
                message: generateValidationMessage(error)
            })
        }
        await updateUserByUuidService(req.params.uuid, value, req.id)
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

export const getUserByToken = async (token, res, req_id) => {
    try {
        LOGGER(logType.INFO, "Start getUserByTokenController", token, req_id)
        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (error) {
        LOGGER(logType.ERROR, "Error ", error.stack)
        res.status(500).json({
            type: "internalServerError",
            message: error.message
        })
    }
}