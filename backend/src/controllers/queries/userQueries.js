const getAllUsers = "SELECT * FROM users"
const geUserById = "SELECT * FROM users WHERE id = $1"
const checkUsername = "SELECT s FROM users s WHERE s.username = $1"  // same as  "SELECT * FROM users WHERE id = $1"
const addUser = "INSERT INTO users (username,password,name) VALUES ($1,$2,$3)"
const deleteUser = "DELETE FROM users WHERE id = $1"
const deleteAlUusersData = "TRUNCATE users" // To Delete Student data
const updateUserInformation = "UPDATE users SET username = $1 , password = $2 , name = $3 WHERE id = $5"


module.exports ={
    getAllUsers,
    geUserById,
    checkUsername,
    addUser,
    deleteAlUusersData,
    deleteUser,
    updateUserInformation
}