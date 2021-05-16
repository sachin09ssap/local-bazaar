
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const { errors } = require("formidable");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req,res) => {
    // console.log("REQ BODY", req.body);
    // res.json({
    //     message: "signup routes works!"
    // });
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err:"NOT able to save user in DB"
            })
        }
        res.json(user);
    })
};

exports.signin = (req,res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User email does not exists"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "email and password do not match"
            })
        }

        // Create token
        const token = jwt.sign({_id: user._id},process.env.SECRET);
        // Put token in cookie
        res.cookie("token",token,{expire: new Date()+9999});

        // Send response to front end
        const {_id, firstname, email, roles} = user;
        return res.json({token,user: {_id, firstname, email, roles}});
    });
};

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successful"
    });
};


// Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

// custom middleware
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next();
};

exports.isAdmin = (req,res,next) => {
    if(req.profile.roles === 0){
        return res.status(403).json({
            error: "You are not ADMIN, Acess Denied"
        });
    }
    next();
};