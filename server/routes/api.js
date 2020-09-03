const express=require('express')
const multer = require('multer')
const {spawn} = require('child_process');
const Person = require("../models/person")
var mime = require('mime-types')
const Emotion = require('../models/emotion')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user');
const user = require('../models/user');
const { userInfo } = require('os');
const { cpuUsage } = require('process');
const router = express.Router()
const db = "mongodb+srv://E-learning:159753@e-learning.bgtzh.mongodb.net/user?retryWrites=true&w=majority"



mongoose.connect(db, err =>{
    if (err){
        console.error('Err!' + err)
    }
    else{
        console.log('connected to Mongodb')
    }
})


function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unanothirezed request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unanothirezed request')
    }
    let payload = jwt.verify(token,'secretkey')
    if(!payload){
        return res.status(401).send('Unanothirezed request')
    }
    req.userId = payload.subject
    next()
}

// MULTER FILTERS
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,  //new Date().toISOString().replace(/:/g,
        //'-')+file.originalname + '.' + mime.extension(file.mimetype) 
        '3'+'.' + mime.extension(file.mimetype) 
        
        );
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 25
    },
    fileFilter: fileFilter
  });
  // ENDING MULTER FILTER



router.get('/',(req,res)=>{
    res.send('Sent from API Route')
    })


    router.post("/person", upload.single('personImage'), (req, res, next) => {
        const personImage = new Person({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         personImage: req.file.path 
       });
       personImage
         .save()
         .then(result => {
           console.log(result);
           res.status(201).json({
             message: "Created Image successfully",
             createdPerson: {
                 name: result.name,
                 _id: result._id,
                 request: {
                     type: 'GET',
                     url: "http://localhost:3000/" + result._id
                 }
             }
           });
         })
         .catch(err => {
           console.log(err);
           res.status(500).json({
             error: err
           });
         });
         console.log(req.file)
     });

    router.get('/person', (req, res) => {
 
        var dataToSend;
    
        // spawn new child process to call the python script
        const python = spawn('python', ['DeepFace.py']);
        // collect data from script
        python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        ///res.send(dataToSend)
        console.log(dataToSend)
        UserName="Alex"
        zoe="Music and Instruments"
        const emotion = new Emotion(
          {_id: new mongoose.Types.ObjectId(),
            emotion: dataToSend,
            UserID :UserName,
            CourseTitle:zoe
        })
        emotion.save((error, registeredEmotion) => {
          if (error) {
            console.log(error)      
          } else {
            res.status(200).send(registeredEmotion)
            console.log(registeredEmotion)
          }
        })


        });
        
    
    })


router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
      if (error) {
        console.log(error)      
      } else {
          let payload= { subject : registeredUser._id}
          let token = jwt.sign(payload, 'secretkey')
        res.status(200).send({token})
      }
    })
  })

router.post('/login', (req,res)=>{
    let userData = req.body
    User.findOne({email: userData.email},(error,user)=>{
        if (error){
            console.log(error)
        }
        else {
            if(!user){
                res.status(401).send('Invalid email')    
            }
            else{
                if (user.password !== userData.password)
                {
                    res.status(401).send('Password Incorrect')
                }
                else {
                    let payload= { subject : user._id}
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({token})
                }
            }
            
        }       
    })
})


router.get('/categories', verifyToken, (req,res)=>{
   let catg=[{
        "_id":"1",
        "name":"Auto Exp",
        "description":"lorem ips",
        "date":"2012-04-23T" 
   },
   {
    "_id":"2",
    "name":"Auto Exp",
    "description":"lorem ips",
    "date":"2012-04-23T" 
    },
    {
        "_id":"3",
        "name":"Auto Exp",
        "description":"lorem ips",
        "date":"2012-04-23T" 
   }
    ]
    res.json(catg);

})

router.get('/course', (req,res)=>{
    let catg=[{
         "_id":"1",
         "name":"Auto Exp",
         "description":"lorem ips",
         "date":"2012-04-23T" 
    },
    {
     "_id":"2",
     "name":"Auto Exp",
     "description":"lorem ips",
     "date":"2012-04-23T" 
     },
     {
         "_id":"3",
         "name":"Auto Exp",
         "description":"lorem ips",
         "date":"2012-04-23T" 
    },
    {
        "_id":"4",
        "name":"Auto Exp",
        "description":"lorem ips",
        "date":"2012-04-23T" 
   },
   {
       "_id":"5",
       "name":"Auto Exp",
       "description":"lorem ips",
       "date":"2012-04-23T" 
  }
     ]
     res.json(catg);
     
 })

module.exports = router;
