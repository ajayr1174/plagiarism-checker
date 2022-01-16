const express = require('express');
const jwt = require('jsonwebtoken')
const { Teacher } = require('../Model/Teacher');
const userkey = process.env.TEACHER_KEY
const path=require('path')

// const { generateKeyPairSync } = require('crypto');
// const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//   modulusLength: 4096,  // the length of your key in bits
//   publicKeyEncoding: {
//     type: 'spki',       // recommended to be 'spki' by the Node.js docs
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
//     format: 'pem',
//     cipher: 'aes-256-cbc',   // *optional*
//     passphrase: 'top secret' // *optional*
//   }
// });

const private_key=require('fs').readFileSync(path.join(__dirname,'../','private.pem'));
const teachersignin = async (req, res) => {
    
    const { email } = req.body;
    try {
        const teacher = await Teacher.findOne({ email: email });
        if (!teacher) 
        {
            return res.status(401).json({ err: "Wrong Email or Password" });
        }

        const ress = await teacher.comparepassword(req.body.password);

        if (ress.err) {
            return res.status(401).json({ err: "Wrong Email or Password" });
        }

        const newt = { id:teacher._id,email: teacher.email, name: teacher.name };

        console.log("Building")
        const token = jwt.sign(newt, private_key, { algorithm: 'RS256' });
        console.log(token)
        return res.status(201).json({ mssg: "Login Successfull", token })

    }
    catch (error) {
        return res.status(500).json({ err: error, mssg: "Something Bad occurred" });
    }

}

const teachersignup = async (req, res) => {
    const { email, fname,lname,phoneno, password } = req.body;
    console.log(email, fname, lname, phoneno, password)
    try {
        const newteacher = await new Teacher({ email, fname,lname, password, phoneno});

        newteacher.save((err, user) => {
            if (err) {
               
                if (err.code === 11000 && err.keyPattern.email === 1)
                {
                    res.status(403).json("Teacher already Exists");
                    return;
                }

                let arr = [];
                for (let k in err.errors) {
                    
                    let obj = {
                        "name": k,
                        "mssg": err.errors[k]
                    }
                    arr.push(obj);
                }
                return res.status(403).json({ errmain: arr, errsec: err._message })
            }

            else {
                console.log(user._id)
                
                let user2 = {id:user._id,email:user.email,name:user.name};
                const token = jwt.sign(user2, private_key, { algorithm:'RS256'})
                return res.status(201).json({ mssg: "Teacher Registered Successfully", token });

            }
        })

    }
    catch (err) {
        res.status(500).json({ err, mssg: "Something went wrong" })
    }
}


module.exports = { teachersignin, teachersignup }