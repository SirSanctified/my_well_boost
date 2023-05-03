import User from "../models/userModel"

export const updateAccountController = async(req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findOne({ where: { id: userId } })
        if (user) {
            await user.update({ ...req.body })
            res.sendStatus(200)
        } else {
            res.status(404).json({ "error": `User with id ${ userId } not found` })
        }
    } catch (error) {
        res.status(500).json({ "error": `ERROR: ${ error.message }` })
        console.log(error)
    }
}