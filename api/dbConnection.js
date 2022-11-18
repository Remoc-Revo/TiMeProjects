const mysql=require('mysql2');

const pool=mysql.createPool(
    {
        host:'localhost',
        user:'tiMeProjectsUser',
        password:'tiMe2022.',
        database:'tiMeProjects',
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    }
);

module.exports=pool;