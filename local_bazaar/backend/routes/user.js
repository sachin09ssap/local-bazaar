const express = require("express");
const router = express.Router();
// , getAllUsers
const { getUserById, getUser, updateUser,userPurchaseList } = require("../controllers/user");
const { isSignedIn ,isAuthenticated } = require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
// router.get("")
// router.get("/users",getAllUsers);
router.put("/user/:userId",isSignedIn,isAuthenticated, updateUser)
router.get("/order/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)


module.exports = router;
