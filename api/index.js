const express=require('express');
const app=express();
// const session=require('express-session');
const session=require('express-session');
const routes=require('./routes');
const path=require('path');
const cors=require('cors');
const fs=require('fs');
const https=require('https');

const cookieParser=require('cookie-parser');

// import './configuration/session/redis';
// app.all('/myProjects', function (req, res, next) {
// //     res.header("Access-Control-Allow-Origin", "*");
// //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
// //     res.header("Access-Control-Allow-Credentials", true);
// //     res.header("x-access-token");
//     res.header('Cache-Control', 'no-store');

//     next();
// });


 app.use(express.urlencoded({extended:false}));

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000',
    "preflightContinue":false
}));

app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}));

app.use(routes);





/*app.use((err,req,res,next)=>{
    return res.send("internal server error");
});*/


// https.createServer(
//     {cert:fs.readFileSync('localhost.crt'),
//      key:fs.readFileSync('localhost.key')},
//      app)
//      .listen(3003,()=>{console.log("listening at port 3003");
//         }
// );

app.listen(3001);
console.log("listening at port 3001");
