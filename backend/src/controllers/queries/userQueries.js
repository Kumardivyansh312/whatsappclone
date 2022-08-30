const getAllUsers = "SELECT id,username,name,email FROM users"
const geUserById = "SELECT id,username,name,email FROM users WHERE id = $1"
const checkUsername = "SELECT * FROM users WHERE username = $1"   //"SELECT s FROM users s WHERE s.username = $1"  // same as  "SELECT * FROM users WHERE id = $1"
const checkEmail = "SELECT * FROM users WHERE email = $1"   //"SELECT s FROM users s WHERE s.username = $1"  // same as  "SELECT * FROM users WHERE id = $1"
const addUser = "INSERT INTO users (username,password,name,email) VALUES ($1,$2,$3,$4)"
const deleteUser = "DELETE FROM users WHERE id = $1"
const deleteAlUusersData = "TRUNCATE users" // To Delete Student data
const updateUserInformation = "UPDATE users SET username = $1 , password = $2 , name = $3 WHERE id = $5"
const updateUserPassword = "UPDATE users SET password = $1 WHERE id = $2"

module.exports = {
    getAllUsers,
    geUserById,
    checkUsername,
    addUser,
    deleteAlUusersData,
    deleteUser,
    updateUserInformation,
    updateUserPassword,
    checkEmail
}