import pino from "pino";
import moment from "moment"
import dotenv from "dotenv"

dotenv.config()

export const logType = {
    INFO: "info",
    ERROR: "error",
    DEBUG: "debug"
}

export const LOGGER = (logType, message, object, req_id) => {
    message = "[ ID:" + req_id + " ] = " + message
    message = object ? message + " [ " + JSON.stringify(object, null, 4) + " ]" : message

    if (logType == "info") {
        pinoLogConfig.info(message)
    }
    if (logType == "error"){
        pinoLogConfig.error(message)
    }
    if (logType == "debug"){
        pinoLogConfig.debug(message)
    }
}

let date_ob = new Date();

const PINO_TARGET = process.env.PINO_TARGET

export const pinoLogConfig = pino(
    {
        timestamp:() => `, "time":"${moment().format()}"`,
        transport:{
            targets:[
                PINO_TARGET == "file" ? {
                    target:"pino/file",
                    options: {
                        destination: `./log/${(date_ob.getDate() < 10 ? "0" + date_ob.getDate() : date_ob.getDate()) + "" + ((date_ob.getMonth() + 1) < 10 ? "0" + (date_ob.getMonth() + 1) : (date_ob.getMonth() + 1)) + "" + date_ob.getFullYear()}.pinoLogConfig`,
                        mkdir:true,
                    }
                } : 
                {
                    target:"pino-pretty",
                }
            ]
        },
    },
)