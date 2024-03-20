import { getUserByToken } from "../app/user/user.handler.js";
import { LOGGER, logType } from "../utils/loggerUtil.js";

export const authTokenMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            LOGGER(logType.INFO, "Start Authentication", null, req.id);
            const user = await getUserByToken(req.header('Authorization'), res, req.id);
            if (user && roles.indexOf(user.userRole) >= 0) {
                LOGGER(logType.INFO, "User", user, req.id);
                next();
            }
        } catch (error) {
            res.status(401).json({
                type: "unauthorizedError",
                message: new Error('Invalid request!')
            });
        }
    }
}