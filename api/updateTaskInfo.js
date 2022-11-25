const pool=require('./dbConnection');


exports.updateTaskInfo=(req,res)=>{
    const {body}=req;

    if(req.originalUrl=='/updateOverallTaskInfo'){
        
        if(body.handler_on_edit!=''&&typeof body.handler_on_edit!='undefined'){
            console.log("the task idd: ",body.taskId);


            pool.query(`UPDATE REQUIREMENT SET requirementHandlerId=${body.handler_on_edit}\                        
                        WHERE requirementId=${body.taskId}`,
                        (err,result)=>{
                            if(err){
                                throw(err);
                            }
                            console.log("for handler",result);
                        }
            );

        }

        if(body.start_date_on_edit!=''&&typeof body.start_date_on_edit!='undefined'){
            pool.query(`UPDATE REQUIREMENT SET startDate='${body.start_date_on_edit}' WHERE requirementId=${body.taskId}`,
                        (err,result)=>{
                            if(err){
                                throw(err);
                            }
                            console.log("for start date",result);
                        });
        }

        if(body.end_date_on_edit!=''&&typeof body.start_date_on_edit!='undefined'){
            console.log("thaaaa baaaddddyyy",body.end_date_on_edit);
            pool.query(`UPDATE REQUIREMENT SET endDate='${body.end_date_on_edit}' WHERE requirementId=${body.taskId}`,
                        (err,result)=>{
                            if(err){
                                throw(err);
                            }
                            console.log("for end date",result);
                        });
        }

       return res.status(200);
    }
}