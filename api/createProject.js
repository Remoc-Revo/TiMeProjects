const pool=require('./dbConnection');
const {validationResult}=require('express-validator');

exports.createProject=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.render('pages/createProject',
            {
                error:errors.array()[0].msg
            });
    }

    
    const {body}=req;

    //const creatorId=req.session.userId;
    const projectName=body.projectName;
    const projectDescription=body.projectDescription;
    const startDate=body.startDate;
    const endDate=body.endDate;

    var query=`SELECT * FROM PROJECT WHERE projectName='${projectName}'`;
    pool.query(query,(err,result)=>{
        if(result!=0){
            return res.render('pages/createProject',
                {error:'project name unavailable'}
                );
        }
    })

    var query=`INSERT INTO PROJECT(projectId,projectName,creatorId,creationDatetime,startDate,endDate,projectDescription)\
                VALUES(null,'${projectName}',34,now(),'${startDate}','${endDate}','${projectDescription}')`;
   try{
        pool.query(query,async (err,result)=>{
            if(err){
                throw (err);
            }
            if(result.affectedRows==1){
                pool.query(`SELECT * FROM PROJECT WHERE projectName='${projectName}'`,async(err,result)=>{
                    req.session.projectId=await result[0].projectId;
                    req.session.projectName=await result[0].projectName;
                    console.log("resultproject id:",result[0].projectId);

                    pool.query(`INSERT INTO PROJECT_MEMBER VALUES('${req.session.userId}',1,\
                            '${req.session.projectId}',now())`,
                            async(err,result)=>{
                                if(err){
                                    console.log(err);
                                }
                            });

                    return res.redirect('/dashboard.ejs');
                });
                
            }
        });
   }

   catch(e){
    next(e);
   }

}