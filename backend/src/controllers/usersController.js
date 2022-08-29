const { pool } = require('../../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userQueries = require('./queries/userQueries')
const { json } = require('express')

//Get allUsers From db

const getAllUsers = (req, res) => {
    pool.query(userQueries.getAllUsers, (err, result) => {
        if (err) throw err
        res.json({ success: true, message: "All Users Fetched", data: result.rows })
    })
}

//Get Register User In db

const registerUser = (req, res) => {
    const { username, password, confirmPassword, name } = req.body
    if (username && password && confirmPassword && name) {
        pool.query(userQueries.checkUsername, [username], async (err, result) => {
            if (err) throw err
            if (result.rows.length) {
                res.json({ success: false, message: "username already found" })
            } else {
                if (password === confirmPassword) {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    pool.query(userQueries.addUser, [username, hashPassword, name], (err, result) => {
                        if (err) throw err
                        res.json({ success: true, message: "User Stored", data: { username: username, name: name } })
                    })
                } else {
                    res.json({ success: false, message: "password and confirm Password did not matched" })
                }

            }
        })
    } else {
        res.json({ success: false, message: "All Feilds Required" })
    }
}

//Check User and provide login

const loginUser = (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        pool.query(userQueries.checkUsername, [username], async (err, result) => {
            if (err) throw err
            if (result.rows.length) {
                const isMatch = await bcrypt.compare(password, result.rows[0].password)
                if (username === result.rows[0].username && isMatch) {
                    const token = jwt.sign({
                        userId: result.rows[0].id, username: result.rows[0].username
                    },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: '5d'
                        })
                    res.json({ success: true, message: "Login Success", data: { token: token } })
                } else {
                    res.json({ success: false, message: "Invalid username or password" })
                }
            } else {
                res.json({ success: false, message: "You are not registered please register first" })
            }
        })
    } else {
        res.json({ success: false, message: "All Feilds Required for login" })
    }
}

// Change Password

const changePassword = async (req, res) => {
    const { id, username } = req.user
    const { password, confirmPassword } = req.body
    if (password === confirmPassword) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        pool.query(userQueries.updateUserPassword, [hashPassword, id], (err, result) => {
            if (err) throw err
            res.json({ success: true, message: `Password updated for ${username}`})
        })
    } else {
        res.json({ success: false, message: "password and confirm Password did not matched" })
    }
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    changePassword
}