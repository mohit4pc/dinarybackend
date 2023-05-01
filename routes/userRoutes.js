const express = require("express");
const { allUsers, singleUser, editUser, deleteUser } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/allUser", isAuthenticated, isAdmin, allUsers)
router.get("/singleUser/:id", isAuthenticated, singleUser)
router.put("/editUser/:id", isAuthenticated, editUser)
router.delete("/deleteUser/:id", isAuthenticated, isAdmin, deleteUser)
module.exports = router; 