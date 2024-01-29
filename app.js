const express=require('express')
const cors=require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminModel=require('./models/Admin');
const userModel = require('./models/User');
const candidateModel = require('./models/Candidates');
const electionModel = require('./models/Elections');

const app= new express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors())

//secret key for jwt
const JWT_SECRET_KEY = 'your-secret-key';

//admin details handle
app.post('/add',(req,res)=>{
    new adminModel(req.body).save();
    res.send("Data Added")
})

//login with authentication
app.post('/adminlogin',async(req,res)=>{
    try{
        const {username,password} = req.body;

        //check if the user exists
        const user = await adminModel.findOne({username});
        if(!user){
            return res.status(401).json({message:'Invalid username or password'});
        }

        //generate a JWT token
        const token = jwt.sign({userId: user._id},JWT_SECRET_KEY);
        res.json({message:'Login successful', token});
    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: `Internal Server Error - Login: ${error.message}` });
    }
});

app.get('/view',async(req,res)=>{
    let result=await adminModel.find();
    res.json(result);
})
app.put('/update/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id 
    await adminModel.findByIdAndUpdate(id,req.body)
    res.json({message:'updated'})
})

//user details handle
//registertion with authentication
app.post('/register',async(req,res)=>{
    try{
        const {username,password,rollNo,Dept,email} = req.body;

        //check if the username or email already exists
        const existingUser = await userModel.findOne({$or: [{username},{email}]});
        if(existingUser){
            return res.status(400).json({message:'Username or email already exists'});
        }

        //hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password,10);

        //save the user to the database
        const newUser = new userModel({
            username,
            password: hashedPassword,
            rollNo,
            Dept,
            email
        });
        
        const savedUser = await newUser.save(); // Save the new user and get the saved document
        
        // generate a JWT token with the saved user's ID
        const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET_KEY);
        res.status(201).json({ message: 'User registered successfully', token });
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Internal sarver error'});
    }
});

//login with authentication
app.post('/userlogin',async(req,res)=>{
    try{
        const {email,password} = req.body;

        //check if the user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid username or password'});
        }

        //generate a JWT token
        const token = jwt.sign({userId: user._id},JWT_SECRET_KEY);
        res.json({message:'Login successful', token});
    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: `Internal Server Error - Login: ${error.message}` });
    }
});

app.get('/uview',async(req,res)=>{
    let rslt = await userModel.find();
    res.json(rslt);
})
app.put('/uedit/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id 
    await userModel.findByIdAndUpdate(id,req.body)
    res.json({message:'updated the user data'})
})
app.delete('/uremove/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id
    await userModel.findByIdAndDelete(id)
    res.json({message:'deleted the user data'})
})

//election details handle
app.post('/eadd',(req,res)=>{
    new electionModel(req.body).save();
    res.send("Election Data Added")
})
app.get('/eview',async(req,res)=>{
    let rslt = await electionModel.find();
    res.json(rslt);
})
app.put('/eedit/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id 
    await electionModel.findByIdAndUpdate(id,req.body)
    res.json({message:'updated the user data'})
})
app.delete('/eremove/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id
    await electionModel.findByIdAndDelete(id)
    res.json({message:'deleted the user data'})
})

//candidate details handle
app.post('/cadd',async (req,res)=>{
    await new candidateModel(req.body).save();
    res.send("candidate Data Added")
})
app.get('/cview',async(req,res)=>{
    let rslt = await candidateModel.find();
    res.json(rslt);
})
app.put('/cedit/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id 
    await candidateModel.findByIdAndUpdate(id,req.body)
    res.json({message:'updated the user data'})
})
app.delete('/cremove/:id',async(req,res)=>{
    console.log(req.params)
    let id=req.params.id
    await candidateModel.findByIdAndDelete(id)
    res.json({message:'deleted the user data'})
})


app.listen(8000,()=>{
    console.log("port 8000 is up and running")
})

