const jwt = require('jsonwebtoken');
const { pool } = require('../../db');
const userQueries = require('../controllers/queries/userQueries')

const verifyAuthenticatedUser = (req, res, next) => {
    let token;
    const { authorization } = req.headers
    if (authorization && authorization.startsWith("Bearer")) {
        token = authorization.split(" ")[1]
        try {
            const { username } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            pool.query(userQueries.checkUsername, [username], async (err, result) => {
                if (err) throw err
                if (result.rows.length) {
                    req.user = result.rows[0]
                    next()
                } else {
                    res.json({ success: false, message: "You are not registered please register first" })
                }
            })
        } catch {
            res.send("Invalid token")
        }
    } else {
        res.json({ success: false, message: "Please send a valid token you are unauthorized" })
    }
}


module.exports = {
    verifyAuthenticatedUser
}