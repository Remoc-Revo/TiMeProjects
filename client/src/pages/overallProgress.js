import React,{useEffect,useState} from "react";
import ProjectNav from "../navs/projectNav";
import MainNav from '../navs/mainNav';
import  axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OverallProgress(){
    const navigate=useNavigate();

    var [tasks,setTasks]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/overall_progress')
             .then((response)=>{
                setTasks(response.data.tasks);
             })
             .catch((err)=>{
                if(err.response.status===401){
                    navigate('/login');
                }
             })

  
    },[])

  
    return(
        <div >
            <MainNav/>
            <div className="pageContent">
            
                <div className="sideNav">
                    <ProjectNav/>
                </div>

                <div className="mainContent">

                    <table class="table">
                        <thead class="bg-light">
                            <tr>
                                <td>Task</td>
                                <td>handler</td>
                                <td>Start-Date</td>
                                <td>Dealine</td>
                                <td>Action</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                                {/* {tasksMarkup}                             */}
                                {tasks.map(task=>{                                    
                                    var handler;
                                    var startDate;
                                    var endDate;

                                    // handler details
                                    if(typeof task.requirementHandlerDetails !='undefined'){
                                        handler=<div class="d-flex align-items-center">
                                                    <img src={require("../user-alt.png")}
                                                            alt=""
                                                            style={{width:'40px',height:'40px'}}
                                                            class="rounded-circle"
                                                        />
                                                        <div class="ms-3">
                                                            <p class="fw-bold mb-1">{task.requirementHandlerDetails.userName}</p>
                                                            <p class="text-muted mb-0" id="handler">{task.requirementHandlerDetails.userEmail}</p>
                                                        </div>

                                                 </div>
                                    }
                                    else{
                                        handler=<div class="ms-3">
                                                    <p style={{color:'orangered'}} id="handler">unasigned</p>
                                                </div>
                                    }

                                    //startDate
                                    if(task.startDate!=null){
                                        startDate=<p id={'startDate'+task.taskId}>
                                                        {task.startDate}
                                                    </p>

                                    }
                                    else{
                                        startDate=<p id={'startDate'+task.taskId}style={{color:'orangered'}}>unasigned</p>
                                    }


                                    //endDate
                                    if(task.endDate!=null){
                                        endDate=<td id={'endDate'+task.taskId}>
                                                        {task.endDate}
                                                </td>
                                    }
                                    else{
                                        endDate=<td id={'endDate'+task.taskId} style={{color:'orangered'}}>unasigned</td>
                                    }

                                    return  <tr>
                                                <td id={'taskName'+task.taskId}>
                                                    {task.taskName}
                                                </td>
                                                <td>
                                                         {handler}                                             
                                                </td>
                                                                         
                                                <td >
                                                    {startDate}
                                                </td>
                                                   
                                                <td>
                                                   {endDate} 
                                                </td>
                                                
                                                
                                                <td>
                                                                                                        
                                                        <button class="btn btn-link btn-sm btn-rounded" data-mdb-toggle="modal" 
                                                                data-mdb-target="#editTask">
                                                            EDIT
                                                        </button>
                                                    

                                                </td>
                                                <td>
                                                    <p style={{color:'green'}}>DONE</p>
                                                </td>
                                            </tr>
                                })}
                        </tbody>
                    </table>
                </div>
                
                <div className="sideNav">
                    
                </div>
        
            </div>
        </div>
    )
}