const pool=require('./dbConnection');
const {getProjectMembers}=require('./getProjectMembers');

exports.getOverallProgress=(req,res)=>{
    //sets session's project members
    getProjectMembers(req,res);
    var tasksInfo=[]
    pool.query(`SELECT * FROM REQUIREMENT WHERE requirementType='system' 
                AND projectId=${req.session.projectId}`,async(err,result)=>{
                    if(err){
                        throw(err);
                    }
                    console.log(result);

                    for await(var systemRequirement of result){
                        var requirementHandlerDetails=[];
                        if(systemRequirement.requirementHandlerId!=null){
                            
                            requirementHandlerDetails.push(await fetchHandlerDetails(systemRequirement.requirementHandlerId));
                            console.log("theeeeee requirement handlerrrr",requirementHandlerDetails);

                            
                            tasksInfo.push({
                                taskName:systemRequirement.requirementTerm,
                                taskId:systemRequirement.requirementId,
                                requirementHandlerDetails:requirementHandlerDetails[0],
                                startDate:systemRequirement.startDate,
                                endDate:systemRequirement.endDate,
                                status:systemRequirement.status
                                
                                });                                                 
                                      
                                                        
                        }
                        else{
                            tasksInfo.push({
                                taskName:systemRequirement.requirementTerm,
                                taskId:systemRequirement.requirementId,                                
                                startDate:systemRequirement.startDate,
                                endDate:systemRequirement.endDate,
                                status:systemRequirement.status
                            });
                        }
                        
                       

                                        
                }
                 
                console.log("the infoooo",tasksInfo);

                res.json(
                            {tasks:tasksInfo,
                             projectMembers:req.session.projectMembers
                            }
                )
    });
}


async function fetchHandlerDetails(id){
    return new Promise((resolve,reject)=>{
        pool.query(`SELECT userId,userName,userEmail,phone FROM USER WHERE userId=${id}`,
                    async(err,result)=>{
                        if(err){
                            reject(err);
                        }
                        console.log("thfffffffffddeers result:",result);
                        resolve(result[0]);
        });
    });
}

