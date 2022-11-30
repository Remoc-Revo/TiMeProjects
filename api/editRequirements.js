const pool=require('./dbConnection');


exports.addRequirement=(req,res,next)=>{
    const {body}=req;
    console.log(body);

    if(body.requirement_type=='user'){
        pool.query(`INSERT INTO REQUIREMENT(requirementId,projectId,requirementType,requirementTerm,\
            requirementDescription) VALUES(null,${req.session.projectId},'${body.requirement_type}','${body.requirement_term}','${body.requirement_description}')`,
            (err,result)=>{
                if(err){
                    throw(err);
                }
                if(result){
                    return res.status(200);
                }
            }
        );
    }

    if(body.requirement_type=='system'){
        pool.query(`INSERT INTO REQUIREMENT(requirementId,projectId,requirementType,requirementTerm,\
            requirementDescription) VALUES(null,${req.session.projectId},'${body.requirement_type}','${body.requirement_term}','${body.requirement_description}')`,
            (err,result)=>{
                if(err){
                    throw(err);
                }
                if(result){
                    return res.status(200);
                }
            }
        );
    }


}

exports.editRequirement=(req,res)=>{
    const {body}=req;

    console.log("the body:tt::",body);
    
    pool.query(`UPDATE REQUIREMENT SET requirementTerm='${body.requirement_term}',\
                    requirementDescription='${body.requirement_description}' WHERE requirementId=${body.requirement_id}`,
                    (err,result)=>{
                    if(err){
                        throw(err);
                    }
                    if(result){
                        return res.status(200);
                    }
                    })
    

    
}