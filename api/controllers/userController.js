const bcrypt=require('bcryptjs');
const pool=require('../dbConnection');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.register=async (req,res,next)=>{
    console.log("register called");

    const errors=validationResult(req);
    const {body}=req;
    console.log("the bodyyyyyyy",body);

    const userName=body.userName;
    const password1=body.password1;
    const password2=body.password2;
    const email=body.email;
    const phone=body.phone;
    const role=body.role;

    if(!errors.isEmpty()){
        console.log('errooooooors:',errors.array()[0].msg);
        return res.json(//'pages/register',
            {error:errors.array()[0].msg,
            enteredName:userName,
            enteredPassword1:password1,
            enteredPassword2:password2,
            enteredEmail:email,
            enteredPhone:phone,
            enteredRole:role});
        
    }

    
 

   try{
        if(password1!=password2){
            return res.json(
            {error:"passwords don't match",
            enteredName:userName,
            enteredPassword1:password1,
            enteredPassword2:password2,
            enteredEmail:email,
            enteredPhone:phone,
            enteredRole:role
            });
        }
        
        const password=password1;
        const hashedPassword=await bcrypt.hash(password,12);


        var query=`SELECT * FROM USER WHERE userEmail='${[body.email]}'`;
        console.log("\n query:",query);
        
        pool.query(query,function(err,rows){
            console.log(rows);


            if(rows.length>=1){
                console.log('this was actually called');
                return res.json(//'pages/register.ejs',
                    {error:"email already in use",
                    enteredName:userName,
                    enteredPassword1:password1,
                    enteredPassword2:password2,
                    enteredEmail:email,
                    enteredPhone:phone,
                    enteredRole:role
                });
            }

            else{
                pool.execute(`INSERT INTO USER(userId,userName,userEmail,phone,registrationDatetime,role,password)\
                                                    VALUES(null,'${userName}','${email}','${phone}',now(),'${role}','${hashedPassword}')`,
                            function(err,result){
                                console.log(result.affectedRows);

                                if(result.affectedRows==1){
                                    pool.query(`SELECT * FROM USER WHERE userEmail='${email}'`,async (err,result)=>{
                                        console.log("the id",result[0].userId);

                                        req.session.userID=result[0].userId;
                                        req.session.userName=result[0].userName;
                                        return res.status(200);
                                    });
                                    
                                }
                            }
                            );

                
            }
        })

       /* pool.getConnection((err,con)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("we're in!!! query is :",query);
                con.query(query,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    if(result==0){
                        console.log("oyeeeeee result",result);
                    }
                });
            }
            pool.releaseConnection(con);
        });*/
  
        

   }

   catch(e){
        next(e);
   }
   
}

exports.login=async(req,res,next)=>{
    const errors=validationResult(req);
    const {body}=req;
    
    const password=body.password;
    const email=body.email;

    console.log("log in called hereee");

    if(!errors.isEmpty()){
        return res.status(401).json({
            error:errors.array()[0].msg,
            enteredEmail:email,
            enteredPassword:password
        });
    }

    try{
        pool.query(`SELECT * FROM USER WHERE userEmail='${email}'`,async (err,result)=>{
            if(result.length!=1){
                console.log("wrong email");
                return res.status(401).json({
                    error:"Invalid Email or Password",
                    enteredEmail:email,
                    enteredPassword:password
                });
            }

            const checkPass=await bcrypt.compare(password,result[0].password);
            
            if(checkPass===true){
                console.log("in");
                // console.log(req.session);

                // req.session.userId=result[0].userId;
                // req.session.userName=result[0].userName;

                const userId=result[0].userId;
                const userName=result[0].userName;

                const token=jwt.sign({userId:userId,userName:userName},"secret",{expiresIn:'1h'});
                console.log("seeeeesssion token:  ",token);

                             
    
                // return res.status(200).json({userToken:token});
                return res.status(200).cookie('token',token,
                                {
                                  httpOnly:true,                     
                                  secure:false,
                                  maxAge:24*3600*1000
                                }).json({});
                      
                // console.log("the result cookie:  ",res.cookie);
                // return res.status(200).json({});
                // return res.render('test2');
                
            }

            return res.status(401).json({
                error:'Invalid Email or Password'
            });
        });
    }
    catch(e){
        next(e);
    }
}