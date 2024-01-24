import multer from "multer";
import dotenv from "dotenv"

dotenv.config()

const UPLOAD_FILE_PATH = process.env.UPLOAD_FILE_PATH

export const uploads = multer({
    dest: UPLOAD_FILE_PATH
})