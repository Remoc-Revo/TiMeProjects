import React,{useEffect,useState} from "react";
import ProjectNav from "../navs/projectNav";
import MainNav from '../navs/mainNav';
import  axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function OverallProgress(){
    const navigate=useNavigate();

    var [tasks,setTasks]=useState([]);
    var [projectMembers,set_projectMembers]=useState([]);
    var [editTask_show,set_editTask_show]=useState(false);
    var [handler_on_edit,set_handler_on_edit]=useState();
    var [start_date_on_edit,set_start_date_on_edit]=useState();
    var [end_date_on_edit,set_end_date_on_edit]=useState();
    var [taskId_on_edit,set_taskId_on_edit]=useState();

    useEffect(()=>{
        axios.get('http://localhost:3001/overall_progress')
             .then((response)=>{
                setTasks(response.data.tasks);
                set_projectMembers(response.data.projectMembers);
             })
             .catch((err)=>{
                if(err.response.status===401){
                    navigate('/login');
                }
             })

  
    },[])



    function toDateInputFormat(dateToConvert){                
        var date=new Date(dateToConvert).getDate();
        date=date>=10?date:"0"+date;

        var month=new Date(dateToConvert).getMonth();
        month=month>=10?month+1:"0"+(month+1);

        var year=new Date(dateToConvert).getFullYear();
        var dateString=year+"-"+month+"-"+date;    
        return dateString;
    }

    function updateOverallTaskInfo(){
        // document.write("the taskID ",taskId_on_edit);
        axios.post('http://localhost:3001/updateOverallTaskInfo',
            {
                handler_on_edit:handler_on_edit,
                start_date_on_edit:start_date_on_edit,
                end_date_on_edit:end_date_on_edit,
                taskId:taskId_on_edit
            })
            .then((response)=>{
                // document.write(response)
            })
            .catch((e)=>{
                if(e.response.status===401){
                    navigate('/login');
                }

            })
    }

  
    return(
        <div >
            <MainNav/>
            <div className="pageContent">
            
                <div className="sideNav">
                    <ProjectNav/>
                </div>

                <div className="mainContent">

                    <table className="table">
                        <thead className="bg-light">
                            <tr>
                                <td>Task</td>
                                <td>handler</td>
                                <td>Start-Date</td>
                                <td>Deadline</td>
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
                                        handler=<div className="d-flex align-items-center">
                                                    <img src={require("../user-alt.png")}
                                                            alt=""
                                                            style={{width:'40px',height:'40px'}}
                                                            className="rounded-circle"
                                                        />
                                                        <div className="ms-3">
                                                            <p className="fw-bold mb-1">{task.requirementHandlerDetails.userName}</p>
                                                            <p className="text-muted mb-0" id="handler">{task.requirementHandlerDetails.userEmail}</p>
                                                        </div>

                                                 </div>
                                    }
                                    else{
                                        handler=<div className="ms-3">
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
                                                                                                        
                                                        <button className="btn btn-link btn-sm btn-rounded" 
                                                                onClick={()=>{
                                                                    set_editTask_show(true);
                                                                    set_handler_on_edit(task.requirementHandlerDetails.userId);
                                                                    set_end_date_on_edit(toDateInputFormat(task.endDate));
                                                                    set_start_date_on_edit(toDateInputFormat(task.startDate));                                                                    
                                                                    set_taskId_on_edit(task.taskId);

                                                                }}>
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

                <Modal show={editTask_show} onHide={()=>{set_editTask_show(false)}} id="editTask" className="container">
                           
                    <Modal.Header  closeButton>
                       <Modal.Title><h4 className="modal-title w-100 font-weight-bold">Edit Task</h4></Modal.Title>                        
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={()=>{updateOverallTaskInfo()}}  className="modal-body mx-3">
                            {/* <div className=" mb-5">
                                <h5 id="task_edited" style={{color:"blue"}}></h5>                                            
                            </div> */}

                            <div className="md-form mb-5 d-flex">
                                <label for="handler_on_edit" className="col-md-3">handler</label>
                                
                                
                                    <select id="handler_on_edit" name="handler_on_edit" onChange={(event)=>{set_handler_on_edit(event.target.value)}}>
                                        {projectMembers.map(member=>{
                                            if(member.userId===handler_on_edit){
                                                return <option value={member.userId} selected>{member.userEmail}</option>
                                            }
                                           return  <option value={member.userId}>{member.userEmail}</option>

                                        })
                                        }
                                    </select>
                              
                            </div>

                            
                            <input type="hidden" id="taskId" name="taskId"/>
                            

                            <div className="mb-5">
                                <label className="col-md-3">start-date</label>
                                <input type="date" id="start_date_on_edit" name="start_date_on_edit" className="col-md-6" value={start_date_on_edit}
                                        onChange={(event)=>{set_start_date_on_edit(event.target.value)}}
                                />
                            </div>

                            <div className="mb-5">
                                <label className="col-md-3">deadline</label>
                                <input type="date" id="end_date_on_edit" name="end_date_on_edit" className="col-md-6" value={end_date_on_edit}
                                        onChange={(event)=>{set_end_date_on_edit(event.target.value)}}
                                />
                            </div>

                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-success">
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </Modal.Body>              
                               
                    </Modal> 
        
            </div>
        </div>
    )
}