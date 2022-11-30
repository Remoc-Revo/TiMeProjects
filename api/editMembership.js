const pool=require('./dbConnection');
const validationResult=require('express-validator');



exports.addMember=(req,res,next)=>{
    const {body}=req;

    console.log(body.newMember);

    //check if the emails exists
    pool.query(`SELECT * FROM USER WHERE userEmail='${body.newMember}'`,(err,result)=>{
        if(err){
            throw(err);
        }
       
        if(result.length==1){
            console.log(result);
            //confirm if the user is already a project member
            const newMemberId=result[0].userId;
            pool.query(`SELECT * FROM PROJECT_MEMBER WHERE userId='${newMemberId}' AND projectId=${req.session.projectId}`,
                (err,result)=>{
                    if(err){
                        throw(err);
                    }
                    if(result.length!=0){
                        console.log("the famaous resuuult:",result);
                        return res.status(400);
                        
                    }
                    else{
                        //register user as a project member
                        pool.query(`INSERT INTO PROJECT_MEMBER VALUES(${newMemberId},0,\
                            ${req.session.projectId},now())`,
                            //'${req.session.projectId}',now())`)
                                (err,result)=>{
                                    if(err){
                                        throw(err);
                                    }
                                    return res.status(200);
                                }
                            );
                    }
                   
                });

            
            

        }
        else{
            console.log("Eror: system allowed email to be used more than once");
        }
    })
}


exports.removeMember=function removeMember(req,res,next){
    console.log("memberrr remover called");
    const {body}=req;

    console.log("body id",body.id);

    pool.query(`DELETE  FROM PROJECT_MEMBER WHERE projectId=${req.session.projectId} AND userId=${body.id}`,
            (err,result)=>{
                if(err){
                    throw(err);
                }
                console.log('the res len::',result.affectedRows)
                if(result.affectedRows==1){
                    console.log("ayeeee eee, removed member,now delete this console.log codeeeeeee!!..");

                    return res.status(200);
                }
            })
}


