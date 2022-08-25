const getAllUsers = (req, res) => {
    res.send("Get All Users Succesfull")
}

const registerUser =(req,res) => {
    res.send("register succesfull")
}


module.exports = {
    getAllUsers,
    registerUser
}