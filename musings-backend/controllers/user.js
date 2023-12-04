const {User} = require("../models")
const {StatusCodes} = require("http-status-codes")

const getUserInfo = async (req, res) => {
    const username = req.params.username
    const user = await User.findOne({ where: { username : username } })
    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'The user could not be found' })
    }
    res.status(StatusCodes.OK).json({ user: user })
}

module.exports = {getUserInfo}