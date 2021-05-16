var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup,signin,isSignedIn} = require("../controllers/auth");

router.post("/signup",[
    check("firstname","name should be atleast 3 char").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","password is atleast 3 characters").isLength({min : 3})
],signup);

router.post("/signin",[
    // check("firstname","name should be atleast 3 char").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","password field is required").isLength({min : 1})
],signin);


router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res) => {
    res.send("A protected Route");
})

module.exports = router;
