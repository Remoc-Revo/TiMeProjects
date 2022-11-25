const pool=require('./dbConnection');


 exports.getProjectMembers=(req,res,next)=>{
    var members=[];

    pool.query(`SELECT userId FROM PROJECT_MEMBER WHERE projectId=${req.session.projectId}`,
        async (err,result)=>{
            if(err){
                throw(err);
            }
            for await(var member of result){
                members.push(await getMemberDetails(member.userId))
            }
            req.session.projectMembers=members;
            // console.log("membeeers",members);
            if(req.originalUrl=='/members'){
                    return res.json(
                    {
                        allEmails:await allEmails(),
                        members:req.session.projectMembers,
                        projectName:req.session.projectName,
                        sessionId:req.session.userId,
                        userLevel:req.session.userLevel
                    });
                }
            console.log("memberrrrrrrs with e",req.session.projectMembers);
        });
    
}

async function getMemberDetails(userId){
    return new Promise((resolve,reject)=>{
        pool.query(`SELECT * FROM USER WHERE userId=${userId}`,
        (err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result[0]);
        })
    })
} 

function allEmails(req,res,next){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT userEmail FROM USER',async(err,result)=>{
            if(err){
                reject(err);
            }
            //console.log("resuuult",result);
            resolve(result);
        });
    })
    
}

