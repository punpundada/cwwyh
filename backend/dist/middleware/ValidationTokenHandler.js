import jwt from "jsonwebtoken";
import { Constants } from "../Constants.js";
const ValidateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    try {
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res
                        .status(Constants.UNAUTHORIZED)
                        .json({ isSuccess: false, data: { message: err.message } });
                }
                req.user = decoded.user;
                next();
            });
        }
        else {
            return res
                .status(Constants.UNAUTHORIZED)
                .json({ isSuccess: false, data: { message: "Unautorized User" } });
        }
    }
    catch (error) {
        return res
            .status(Constants.UNAUTHORIZED)
            .json({ isSuccess: false, data: { message: error.message } });
    }
};
export default ValidateToken;
//# sourceMappingURL=ValidationTokenHandler.js.map