const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
require('dotenv').config();

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// Connection URI for MongoDB Atlas
const uri = process.env.MONGO_URI;

// Connect to MongoDB Atlas
MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db('Bookstore'); // Replace 'your_database_name' with your actual database name
   //middleware

   const verifyToken = (req, res, next) => {
    console.log("here")
  const token = req.headers.authorization;
  if (!token) {
     res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token.split(' ')[1], '1'); // Assuming token format is "Bearer <token>"
    req.user = decoded; // Attach user information to request object
    const collection = db.collection('Register');
const {email,password}=req.user;
  // Find user by email
  console.log("email"+email+" " + "password "+password)
  collection.findOne({ email: email, password: password })
    .then(user => {
      if (!user) {
        res.status(401).json({ result: 'Invalid' });
        console.log("invalid")
      }
      else{
        
    next(); // Move to next middleware or route handler
    }}
    ) 
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};




















    // Define routes
     app.get('/subsequentlogin',verifyToken,(req,res)=>{
      console.log("inthe main pl J A")
  res.status(200).json({ result: 'valid' })
     })




       app.post('/ratebook',verifyToken,(req,res)=>{
      const collection=db.collection("Reviews");
      const email=req.user.email;
      const {rating , review , item}=req.body;
      
      collection.findOne({email:email,ItemId:item.id}).then((result)=>{
        console.log(result)
        if(result){
          res.json("Item already reviewed by you");
          return;
        }
        else{

          const data={email,rating,review,item,ItemId:item.id};
          collection.insertOne({...data}).then((result)=>{res.json("review inserted successfully")}).catch((err)=>{
            res.json("some error occured try again");
          })
        }
      })

  
     })


   app.get('/seereviews',(req,res)=>{
    console.log("in reviews")
    const collection=db.collection("Reviews");
    const documents=[];
    const cursor=collection.find({})
     cursor.forEach(doc => {
    documents.push(doc);
    console.log(doc) // Push each document into the array
  }, err => {
    if (err) {
      console.error('Error iterating over cursor:', err);
      return;
    }
});
setTimeout(()=>{console.log(documents);
res.json(documents)},2000)
  
   })




app.post('/login', (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Get the 'register' collection from MongoDB
  const collection = db.collection('Register');

  // Find user by email
  collection.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password 5' });
      }

      // Compare password
      
        if (user.password!=password) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        else{
        const token = jwt.sign({ email: user.email , password:user.password}, '1', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual secret key

        // Send token to client
        res.json({ token });
      }
    })
    .catch(error => {
      console.error('Error finding user in MongoDB:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});





app.post('/register', (req, res) => {
  const userData = req.body;
  console.log('Received registration data:', userData);

  const collection = db.collection('Register'); // Replace 'Register' with your actual collection name

  // Check if user with same email already exists
  collection.findOne({ email: userData.email })
    .then(existingUser => {
      if (existingUser) {
        // User with same email already exists, return an error
         res.status(400).json({ error: 'User with this email already exists' });
         console.log("here1")

      }

      // Insert the user data into the database
      else{
      const result= collection.insertOne(userData);
            console.log("here2")
      console.log('User registered successfully:', result);
      // Send success response only if the user was inserted successfully
      res.status(201).json({ message: 'User registered successfully' });
    
      }
    }).catch(error => {
      console.error('Error registering user:', error);
      // Send error response for any database errors
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



    // Start the server
 

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
