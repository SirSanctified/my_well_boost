import User from "../models/userModel"


export const userDetailsController = async(req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findOne({ where: { id: userId } })
        if (!user) return res.sendStatus(404)
        res.status(200).json(user.toJSON())
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}