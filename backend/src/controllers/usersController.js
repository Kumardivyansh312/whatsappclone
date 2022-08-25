const { pool } = require('../../db')
const userQueries = require('./queries/userQueries')

const getAllUsers = (req, res) => {
    pool.query(userQueries.getAllUsers, (err, result) => {
        if (err) throw err
        res.json({ success: true, message: "All Users Fetched", data: result.rows })
    })
}

const registerUser = (req, res) => {
    const { username, password, name } = req.body
    pool.query(userQueries.addUser, [username, password, name], (err, result) => {
        if (err) throw err
        res.json({ success: true, message: "User Stored", data: { username: username, name: name } })
    })
}


module.exports = {
    getAllUsers,
    registerUser
}