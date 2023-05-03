import User from "../models/userModel"

export const deleteAccountController = async(req, res) => {
    const { userId } = req.params
    // check if user is in the database and delete
    try {
        const user = await User.findOne({where: { id: userId}})
        if (user) {
            await user.destroy()
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(404)
        console.log(error)
    }
}