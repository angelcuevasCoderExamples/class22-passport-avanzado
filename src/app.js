const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = 8080; 

const app = express();

/** middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());


/** "DATABASE" */

let users = [{email:'johndoe@gmail.com', password:1234}]


//** ENDPOINTS */

app.post('/login', (req, res)=>{
    const {email, password} = req.body; 

    if(!users.find(u=>u.email == email && u.password == password)){
        return res.status(400).send({status:'error', error:'incorrect credentials'})
    }

    const token = jwt.sign({email, password},'ourSecret', {expiresIn:'24h'})
    res.cookie('coderCookie',token,{httpOnly: true }).send({status:'success', message:'successfuly logged in'})
})



app.listen(port, ()=>console.log(`server up and running on port ${port}`))