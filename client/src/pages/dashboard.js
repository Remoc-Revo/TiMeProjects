import {React,useState} from "react";
import ProjectNav from "../navs/projectNav";
import '../index.css';
import NavBar from '../navs/mainNav';
import { useLocation,useNavigate} from "react-router-dom";
import axios from "axios";


export default function Dashboard(){
    const location=useLocation();
    const navigate=useNavigate();
    const projectId=localStorage.getItem('projectId');

    // document.write("the id::",projectId)

    var [projectName,setProjectName]=useState();
    var [projectDescription,setProjectDescription]=useState();
    var [startDate,setStartDate]=useState();
    var  [endDate,setEndDate]=useState();

    axios.post("http://localhost:3001/dashboard",
        {
            withCredentials:true,
            projectId:projectId
        })
        .then((response)=>{
            const projectInfo=response.data;

            setProjectName(projectInfo.projectName);
            setProjectDescription(projectInfo.projectDescription);
            setStartDate(projectInfo.startDate);
            setEndDate(projectInfo.endDate);
        })
        .catch((err)=>{
            if(err.response.status===401){
                navigate('/login');
                // document.write("  the error ;;",err.response.status);


            }
        })

    

    return(
        <div>
            <NavBar/>
            <div className="pageContent">
                
                {/* Sidebar */}
                <div className="sideNav">
                    <ProjectNav/>  
                    
                </div>

                {/* main content */}
                <div className="mainContent">
                        <h2>{projectName}</h2>

                        <p class="mb-3 mt-5">{projectDescription}</p>
                    
                    <ul class="">
                        <li class="nav-item me-3" style={{borderRight:"1px solid green;" ,paddingRight:"10px;"}}>
                            
                                <span class="mb-3 mt-5">Start date: {startDate}</span>
                        </li>
                        <li class="nav-item">
                            
                                <span class="mb-3 mt-5">End date:{endDate}</span>
                        </li>
                    </ul> 
                    

                </div> 

                <td style={{width:"15%"}}>
                </td>
            
            </div>
        </div>
    )
}