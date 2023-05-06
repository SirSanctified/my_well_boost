import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {User} from "../models/associations.js"


dotenv.config()


export const handleRefreshToken = async(req, res) => {
    const cookies = req.cookies
    if (!cookies ?.refreshToken) return res.sendStatus(401)
    console.log(cookies.refreshToken)
    const refreshToken = cookies.refreshToken
    const foundUser = await User.findOne({where: {refreshToken: refreshToken}})
    if (!foundUser) return res.sendStatus(403) // Forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403)
            const accessToken = jwt.sign(
                { id: foundUser.id, email: foundUser.email, },
                process.env.JWT_SECRET_ACCESS,
                { expiresIn: "1h", },
              )
            res.json({ accessToken })
        }
    )
}