const router = require("express").Router();
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./mailer');

//REGISTER
router.post("/register", async (req, res)=> {
    const newUser = new PendingUser({
        email: req.body.email,
        password : CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try{
        await sendConfirmationEmail({toUser: newUser, id: newUser._id})
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser);
        res.status(201).json({message: 'You have been registered.'});
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:email", async (req, res) => {
    try{
        const user = await User.findOne({email: req.params.email});
        const pendingUser = await PendingUser.findOne({email: req.params.email});
        if(pendingUser){
            res.status(200).json({message:"User is already registered! Please visit your email address and active your account"});
        }else{
            const {password, ...info} = user._doc;
            res.status(200).json(info);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//ACTIVATE USER
router.get("/activate/:id", async (req, res) =>{
    const id = req.params.id;
    try{
        const user = await PendingUser.findOne({_id:id});
        const newUser = new User({
            email: user.email,
            password: user.password,
        })
        const savedUser = await newUser.save();
        await user.remove();
        res.status(200).json({message: `User ${id} has been activated`});
        //res.status(200).json({newUser, user, savedUser});
    }catch{
        res.status(422).send("You cannot be activated");   
    }
})


//LOGIN
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        // !user && res.status(401).json("Wrong username!");
        if(!user){
            return res.status(401).json("Wrong credentials!1");
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // originalPassword !== req.body.password && res.status(401).json("Wrong password!");
        
        
        if(OriginalPassword !== req.body.password){
            return res.status(401).json("Wrong credentials!2");
        }
        
        const accessToken = jwt.sign(
            {id:user._id, isAdmin:user.isAdmin},
            process.env.JWT_SEC,
            {expiresIn: '3h'}
        );
        const {password, ...info} = user._doc;
        res.status(200).json({...info, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;