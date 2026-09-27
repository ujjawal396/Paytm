const express=require("express");
const zod=require("zod");
const {User}=require("../db/db.js");
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../config");


const router=express.router();

const signupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{


    

    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existinguser=await User.findOne({
        username:req.body.username
    })

    if(existinguser){
        return res.json({
            message:"Email already taken"
        })
    }
    const dbuser=await User.create(req.body);

    const token=jwt.sign({
        userId:dbuser._id

    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })


})


const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()

})


router.post("/signin",async(req,res)=>{
        
        const {success}=signinSchema.safeParse(req.body);
        if(!success){
            return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
            })
        }

        const user=User.findOne({
            username:req.body.username,
            password:req.body.password
        })

        if(user){
            const token=jwt.sign({
                userId:user._id,

            },JWT_SECRET);
            res.json({
                Token:token,
            });
            return;
        }


         res.status(411).json({
        message: "Error while logging in"
    })



})

module.exports=router;