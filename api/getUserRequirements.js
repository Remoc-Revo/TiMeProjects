const pool=require('./dbConnection');

exports.getUserRequirements=(req,res)=>{
    pool.query(`SELECT * FROM REQUIREMENT WHERE projectId=${req.session.projectId} AND requirementType='user'`,
            (err,result)=>{
                if(err){
                    throw(err);
                }
                if(result){
                    console.log("the requirementsssss,....",result[0]);
                    return res.json(
                            {requirements:result,
                             projectName:req.session.projectName
                            }
                    );
                }
            });
}