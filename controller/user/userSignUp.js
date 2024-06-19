const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
const { sendEmail } = require("./emailCtrl"); 

async function userSignUpController(req,res){
    try{
        const { email, password, name,address,mobile} = req.body

        const user = await userModel.findOne({email})

        if(user){
            throw new Error("Already user exits.")
        }

        if(!email){
           throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
        
        if(!mobile){
            throw new Error("Please provide mobile")
        }
        
        if(!address){
            throw new Error("Please provide address")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()
          const message = `Hi, ${name}! Welcome to our website.`;
          const data = {
            to: email,
            text: "Hey User",
            subject: "Welcome message",
            htm: message,
          };
          await sendEmail(data);
         
        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })

    }
    catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController