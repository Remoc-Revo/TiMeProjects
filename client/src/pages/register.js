import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [role,setRole]=useState('');
    const [password1,setPassword1]=useState('');
    const [password2,setPassword2]=useState('');
    const [errorMessage,setErrorMessage]=useState('');

    const navigate=useNavigate();


    const Register=async(e)=>{
        e.preventDefault();
       
        try{
            await axios.post("http://localhost:3001/register",
                {
                    phone:phone,
                    email:email,
                    userName:name,
                    password1:password1,
                    password2:password2,
                    role:role
                }
                ).then((response)=>{
                        var responseData=response.data;
                        setErrorMessage(responseData.error);
                        
                        if(response.status===200){
                            navigate("/");
                        }
                });
        }
        catch(err){
            document.write("the error:   ",err);
        }
    }

    return(
        <div className="container" style={{marginTop:"100px",backgroundColor:"white",padding:"40px",border:"1px solid lightgrey"}}>
            <h1 style={{paddingLeft:"10%"}}>TiMe-Projects</h1>
            <br/>

            <form onSubmit={Register} method="post">
                <div className="d-flex" style={{marginBottom:"12px"}}>
                    <p className="col-md-4">User Name</p>
                    <input className="col-md-3" type="text" onChange={(e)=>setName(e.target.value)} value={name} required
                        // <% if(typeof enteredName !='undefined'){%>value="<%=enteredName %>"<%}%> 
                        />
                </div>

               
                <div className="d-flex" style={{marginBottom:"12px"}}>
                    <p className="col-md-4">Email</p>
                    <input  className="col-md-3" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required
                        // <% if(typeof enteredEmail !='undefined'){%>value="<%=enteredEmail %>"<%}%>
                        />
                </div>

                <div className="d-flex" style={{marginBottom:"12px"}}>
                    <p className="col-md-4">Phone</p>
                    <input className="col-md-3" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} required
                        // <% if(typeof enteredPhone !='undefined'){%>value="<%=enteredPhone %>"<%}%>
                       />
                </div>


                <div className="d-flex" style={{marginBottom:"12px"}}>
                    <p className="col-md-4">Role</p>
                    <input className="col-md-3" type="text" value={role} onChange={(e)=>setRole(e.target.value)} required
                        // <% if(typeof enteredRole !='undefined'){%>value="<%=enteredRole %>"<%}%>
                        />
                </div>

                <div className="d-flex" style={{marginBottom:"12px"}}>
                    <p className="col-md-4">Password</p>
                    <input className="col-md-3" type="password" value={password1} onChange={(e)=>setPassword1(e.target.value)} required
                        // <% if(typeof enteredPassword1 !='undefined'){%>value="<%=enteredPassword1 %>"<%}%>
                        />
                </div>

                <div className="d-flex" style={{marginBottom:"12px"}}>
                    <p className="col-md-4">Confirm Password</p>
                    <input className="col-md-3" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)} required
                        // <% if(typeof enteredPassword2 !='undefined'){%>value="<%=enteredPassword2 %>"<%}%>
                        />
                </div>

                
                    <div style={{marginBottom:"12px"}}>
                        <p style={{color:"red"}}>{errorMessage}</p>
                    </div>
                
                <div className="d-flex">
                    <input type="submit" value="Register"/>
                    <a href="./login.ejs" style={{paddingLeft:"60%"}}>Have an account?Login</a>
                </div>
            </form>
        </div>


    )
}