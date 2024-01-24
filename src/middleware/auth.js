export const authTokenMiddleware = (req, res, next) => {
    try {
        console.log("authTokenMiddleware")
        next();
    } catch {
        res.status(401).json({
            type: "unauthorizedError",
            message: new Error('Invalid request!')
        });
    }
}