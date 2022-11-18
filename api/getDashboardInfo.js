const pool=require('./dbConnection');

//fetch info about the requested project to be displayed on dashboard page
function getDashboardInfo(req,res,next){
    if(req.method=='POST'){
        const {body}=req;
        pool.query(`SELECT * FROM PROJECT WHERE projectId=${body.projectId}`,
                (err,result)=>{
                    if(err){
                        throw(err);
                    }
                    if(result){
                        console.log(result);
                        req.session.projectId=result[0].projectId;
                        req.session.projectName=result[0].projectName;
                        req.session.projectStartDate=result[0].startDate;
                        req.session.projectEndDate=result[0].endDate,
                        req.session.projectDescription=result[0].projectDescription,
                        
                        console.log("the idddddddddddddddddd hs::",req.session.projectId)
                        //get user level of this project
                        pool.query(`SELECT userLevel from PROJECT_MEMBER WHERE 
                                    projectId=${req.session.projectId} AND userId=${req.session.userId}`,
                                    (err,result)=>{
                                        if(err){
                                            throw(err);
                                        }
                                        if(result){// get back to this after 'making members admin' functionality .length==1){
                                            
                                            req.session.userLevel= result[0].userLevel;
                                            console.log("the levelll:",req.session.userLevel);


                                            return res.json(
                                            {
                                                projectName:req.session.projectName,
                                                projectId:req.session.projectId,
                                                startDate:req.session.projectStartDate,
                                                endDate:req.session.projectEndDate,
                                                projectDescription:req.session.projectDescription,
                                                userLevel:req.session.userLevel
                                            });
                                        }
                                    })

                       
                    }
                });
    }
    else{
        console.log("project name",req.session.projectName);
        return res.render('pages/dashboard',
            {
                projectName:req.session.projectName,
                projectId:req.session.projectId,
                startDate:req.session.projectStartDate,
                endDate:req.session.projectEndDate,
                projectDescription:req.session.projectDescription,
                userLevel:req.session.userLevel
            });
    }
}

module.exports=getDashboardInfo;