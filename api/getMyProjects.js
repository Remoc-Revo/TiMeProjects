const pool=require('./dbConnection');

    var myProjects=[];

    async function getMyProjects(req,res,next){
        var myProjectsBuffer=[];

            pool.query(`SELECT projectId FROM PROJECT_MEMBER WHERE userId=${req.session.userId}`,
                async (err,result)=>{
                    if(err){
                        throw(err);
                    }
                     console.log(result);
                    for await(var project of result){
                        // console.log(project.projectId);
                        myProjectsBuffer.push(await getProjectDetails(project.projectId));
                        // console.log("the waiting myp",myProjectsBuffer);
                    }
                    //await returnMyprojects(res,myProjects,responseIsSent);//json({myProjects:myProjects}); 
                    // responseIsSent=true;
                    return res.status(200).json({p:await setMyProjects(myProjectsBuffer)});//.json({p:promise});
                    // console.log("the projeeects::::::::",myProjects)
                
            });
        
            // console.log("prooojects noow::",myProjectsBuffer);
            // console.log("headers",res);
    
    }
    
     function getProjectDetails(id){
        return new Promise((resolve,reject)=>{
            pool.query(`SELECT * FROM PROJECT WHERE projectId=${id}`,
                (err,result)=>{
                    if(err){
                        reject(err);
                    }
                    //console.log(result);
                    
                    resolve(result);
                });
        });
    }
    
    // async  returnMyprojects(res,myProjects,responseIsSent){
    //     if(responseIsSent==false){
    //         var now=new Date();
    //          console.log("\n\n t is : ",Math.round(now.getTime()));
    //         // await res.status(200);
    //     }
    // }
    
    
    async function setMyProjects(myProjectsBuffer){
        myProjects=myProjectsBuffer;
        return myProjects;
    }
    
    // async  return_myProjects(res,myProjects){
    //     console.log("projects in return: ",myProjects);
    //     // await res.json({p:myProjects});
    // }
    

module.exports=getMyProjects;