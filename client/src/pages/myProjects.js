import React,{ useEffect,useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Table from 'react-bootstrap/Table';
import {Link,useNavigate} from 'react-router-dom'; 
import MainNav from '../navs/mainNav';



export default function MyProjects(){
    const navigate=useNavigate();

    
    var [projectsMarkup,setProjectsMarkup]=useState([]);

        useEffect(()=>{
                axios.get("http://localhost:3001/myProjects",{withCredentials:true})
                        .then((response)=>{
                                // document.write("the res  ",response)
                            
                            // document.write("<br><br>",new Date().getSeconds()," ",response.data.p)
                            const projects=response.data.p;

                            
                            var projectsMarkup_buffer=[];
                            
                            projects.forEach(project=>{
                                //document.write("<br>",project[0].projectName);

                                projectsMarkup_buffer.push(
                                    <li class="">                                                                     
                                                  
                                            <Link class="btn btn-link" to='/myProjects/dashboard' onClick={()=>localStorage.setItem('projectId',project[0].projectId)}>
                                                    {project[0].projectName}
                                            </Link>
                                        
                                    </li>
                            )
                            });

                        //    document.write(projectsMarkup_buffer);
                           setProjectsMarkup(projectsMarkup_buffer);
                           
                        })
                
                .catch((err)=>{
                    if(err.response.status===401){
                        navigate('/login');
                    }
                    
                })
            },[navigate]);
    

            

    return(
        <div style={{padding:"10px 30px"}}>
            <MainNav/>
            <Table bordered >
                <tr>
                    {/* <!--Sidebar--> */}
                    <td style={{width:"20%"}}>
                        <div>
                            <a className="btn btn-secondary" href="/createProject">
                                    + New Project
                            </a>
                        </div>
                        
                    </td>

                    {/* <!--main content--> */}
                    <td style={{width:"90%"}}>                        
                            
                                                                    
                        {/* <div dangerouslySetInnerHTML={{__html:projectsMarkup}}>

                        </div> */}
                        <div>
                            <ol className="">
                            {projectsMarkup}
                            </ol>
                        </div>
                                
                            
                                                
                    </td> 
    
                    <td style={{width:"15%"}}>
                
                    </td>
                </tr>
            </Table>

        </div>
    )
    
}