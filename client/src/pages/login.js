import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials=true;

export default function LoginPage(){
    var [email,setEmail]=useState('');
    var [password,setPassword]=useState('');
    var [errorMessage,setErrorMessage]=useState('');

    const navigate=useNavigate();

    const login=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:3001/login",{                
                email:email,
                password:password
            }).then(async(response)=>{ 
                // const token=response.data.userToken;

                // document.cookie=`token=${token}`;
                // document.write(token); 
                    // await axios.get("http://localhost:3001/",{
                    //     headers:{
                    //         'Authorization':`Bearer ${token}`
                    //     }
                    // })
                    
                if(response.status===200){   
                    
                    navigate("/");
                }
            })
        }
        catch(err){
            if(err.response.status===401){
                setErrorMessage("Invalid Email or Password");
                
            }
            
        }
        
    }

    return(
        <div className="container col-md-6" style={{marginTop:"100px",border:"1px solid lightgrey"}}>
            <h1 style={{paddingLeft:"10%"}}>TiMe-Projects</h1>
            <br/>
            <form onSubmit={login} method="post">
                <div className="d-flex"style={{marginBottom:"12px"}}>
                    <p className="col-md-4">Email</p>
                    <input type="text"  className="col-md-8" value={email} onChange={(e)=>setEmail(e.target.value)}
                        // <% if(typeof enteredEmail!='undefined'){%>value="<%=enteredEmail%>"<%}%>
                        />
                </div>

                <div className="d-flex">
                    <p className="col-md-4">Password</p>
                    <input type="password"  className="col-md-8" value={password} onChange={(e)=>setPassword(e.target.value)}
                    // <% if(typeof enteredPassword !='undefined'){%>value="<%=enteredPassword%>"<%}%>
                    />
                </div>

               
                    <div>
                        <p style={{color:"red"}}>{errorMessage}</p>
                    </div>
                <div >
                    <input className="btn btn-success w-100 mt-3 col-md-6" type="submit" value="Login" style={{marginLeft:"0px"}}/>
                    <div className="d-flex ms-5">
                        Don't have account?
                        <a href="./register.ejs" style={{paddingLeft:"0%"}}>Create Account</a>
                    </div>
                </div>
            </form>
        </div>
    )
}