const router=require('express').Router();
const {body}=require('express-validator');
const jwt=require('jsonwebtoken');


const {register,login}=require('./controllers/userController');

const {createProject}=require('./createProject');

const getMyProjects=require('./getMyProjects');

const getDashboardInfo=require('./getDashboardInfo');

const {getProjectMembers}=require('./getProjectMembers');

const {getUserRequirements}=require('./getUserRequirements');

const {getSystemRequirements}=require('./getSystemRequirements');

const{getOverallProgress}=require('./getProgress');

const{updateTaskInfo}=require('./updateTaskInfo');

const {
        addMember,
        removeMember,
    }=require('./editMembership');

const {addRequirement,editRequirement}=require('./editRequirements');

const ifLoggedIn=(req,res,next)=>{
    console.log("rreeeeeiht here :::::",req);
    
    if(typeof userId!='undefined'){
        if(req.session.userId){
            console.log("useeerrr id:",req.session);
            return res.redirect('/');//??
        }
    }
    next();
}

const ifNotLoggedIn=(req,res,next)=>{ 
    // req.body.token || req.query.token || req.headers["x-access-token"];
    // const authHeader =req.headers['authorization'];
    // const token=authHeader.split(' ')[1];

    const token=req.cookies.token;
    console.log("if not logged in calledd, the sessiion token::::",token);

    jwt.verify(token,"secret",(err,user)=>{
        if(err){
            console.log("token validation error: ",err);
            return res.status(401).json({});
        }
        if(user){
            console.log("found user id: ",user.userId);
            req.session.userId=user.userId;
            
            next();
        }
    })

    
}

router.post('/register',
            ifLoggedIn,
            [body('phone','phone must have 10-12 digits')
                .notEmpty()
                .isLength({min:10,max:12}).
                trim(),
              body('email','invalid email')
                .notEmpty()
                .trim()
                .isEmail(),
              body('password1','password should be atleast 4 characters long')
                .notEmpty()
                .trim()
                .isLength({min:4})
            ],
            register);

router.post('/login',
            ifLoggedIn,
            [body('email','invalid email')
                  .notEmpty()
                  .trim()
                  .isEmail(),
             body('password','incorrect password')
                 .notEmpty()
                 .trim()
                 .isLength({min:4})

            ],
            login);


router.get('/',
    ifNotLoggedIn,
    (req,res)=>{
        res.status(200);
})

router.all('/dashboard',
    ifNotLoggedIn,
    getDashboardInfo
    );

router.get('/welcome.ejs',
    ifNotLoggedIn,
    (req,res)=>{
    res.render('pages/welcome');
})

router.get('/myProjects',
    ifNotLoggedIn,
   getMyProjects

);

router.get('/system_requirements',
        ifNotLoggedIn,
        getSystemRequirements
)

router.get('/my_progress.ejs',(req,res)=>{
    res.render('pages/my_progress');
})

router.get('/schedule.ejs',(req,res)=>{
    res.render('pages/schedule');
})

router.get('/user_requirements',
    ifNotLoggedIn,
    getUserRequirements
)

router.get('/overall_progress',
            ifNotLoggedIn,
            getOverallProgress
)

router.get('/login.ejs',(req,res)=>{
    res.render('pages/login');
})

router.get('/register.ejs',
    (req,res)=>{
    res.render('pages/register');
})

router.get('/createProject.ejs',
    ifNotLoggedIn,
    (req,res)=>{
        res.render('pages/createProject');
    }
);

router.get('/addRequirement.ejs',
    ifNotLoggedIn,
    (req,res)=>{
    res.render('pages/addRequirement');
})

router.get('/members',
    ifNotLoggedIn,
    getProjectMembers
);

router.post('/createProject',
        ifNotLoggedIn,
        [
            body('projectName','name must be entered')
                .notEmpty()
                .trim(),
            body('projectDescription','project description must be entered')
                .notEmpty()
                .trim(),
            body('startDate','start date must be entered')
                .notEmpty()
                .trim(),
            body('endDate','endDate must be entered')
                .notEmpty()
                .trim(),
        ],
        createProject);

router.post('/logout',(req,res,next)=>{
    console.log("logging ouuuut")
    req.session.destroy((err)=>{
        next(err);
    });
    return res.clearCookie('token');
});

router.post('/addMember',
            ifNotLoggedIn,
             addMember
);

router.post('/removeMember',
            ifNotLoggedIn,
             removeMember
);

router.post('/addRequirement',
            ifNotLoggedIn,
             addRequirement
);

router.post('/editRequirement',
    ifNotLoggedIn,
    body('requirement_term')
    .trim(),
    // .escape(),
    body('requirement_description')
    .trim(),
    // .escape(),
    editRequirement
);


router.post('/updateOverallTaskInfo',
    ifNotLoggedIn,
    updateTaskInfo
    )

router.get('/sessionTest',(req,res)=>{
    res.render('sessionTest');
})

module.exports=router;