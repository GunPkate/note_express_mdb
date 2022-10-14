const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/',async(req,res)=>{
    const result = await User.find({})
    res.status(200).json({
        resultCode: 20000,
        resultDescription: 'find all users',
        resultData: result
    })
})

router.post('/register',async(req,res)=>{
    const {first_name, last_name, email , password} = req.body 
    
    // const salt = await bcrypt.genSalt(12);
    // const hashPassword = await bcrypt.hash(password, salt)
    const existEmail = await User.findOne({email:email})
    if(existEmail){
        return res.status(400).json({
            resultCode: 40000,
            resultDescription: "Duplicated data",
        })
    }
    const user = new User()
    user.firstName = first_name;
    user.lastName = last_name;
    user.email = email;
    // user.password = hashPassword;
    user.password = await user.encryptPassword(password);
    await user.save()
    res.status(201).json({
        resultCode: 20100,
        resultDescription: 'create users',
        resultData: user
    })
})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
        return     res.status(400).json({
            resultCode: 40000,
            resultDescription: 'Invalid user',

        })
    }

    const isValid = await user.checkPassword(password)
    if(!isValid){
        return     res.status(400).json({
            resultCode: 40000,
            resultDescription: 'Invalid user of password',
        })
    }

    const token = jwt.sign(
        {sub: user._id}, 
        'secret_test',
        {expiresIn: '1h'}
    )

    res.status(200).json({
        resultCode: 20000,
        resultDescription: 'login',
        resultData: {token}
    })
})

module.exports = router;