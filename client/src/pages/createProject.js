import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainNav from "../navs/mainNav";


export default function CreateProject(){
    const navigate=useNavigate();
    var [projectName,set_projectName]=useState();
    var [projectDescription,set_projectDescription]=useState();
    var [startDate,set_startDate]=useState();
    var [endDate,set_endDate]=useState();
    var [error,set_error]=useState();

    function CreateProject(){
        // document.write(projectName,"<br>",projectDescription,"<br>",startDate,"<br>",endDate);
        // set_error("TODF")

        useEffect(()=>{
                    document.write(projectName,"<br>",projectDescription,"<br>",startDate,"<br>",endDate);

            axios.post('http://localhost:3001/createProject',
              {
                projectDescription:projectDescription,
                projectName:projectName,
                startDate:startDate,
                endDate:endDate
              })
              .then((response)=>{
                // document.write(response);
                
                // document.write(response.data.error)
                // if(typeof response.data.error!=='undefined'){
                //     set_error(response.data.error);
                // }

                // if(response.status===200){
                //     navigate('/myProjects');
                // }
              })
        
            .catch((err)=>{
                if(err.response.status===400){
                    // document.write(err.response.data.error);
                    // set_error(err.response.data.error);
                    document.write(new Date().getTime());
                }
                if(err.response.status===401){
                    navigate('/login');
                }
            });
        },[]);
    }

    return <div className="container">
            <MainNav/>
            <table className="table table-bordered">
                <tr>
                    {/* <!--Sidebar--> */}
                    <td style={{width:'15%'}}>
                            
                    </td>

                    {/* <!--main content--> */}
                    <td >
                        <div className="container">
                            <h2>Create a new project</h2>
                            <form onSubmit={CreateProject} >
                                <div className="d-flex mb-4" >
                                    <p className="col-md-4" >Project Name</p>
                                    <input type="text" name="projectName" className="col-md-5" value={projectName} required onChange={(e)=>set_projectName(e.target.value)}/>
                                </div>

                                <div className="d-flex mb-4">
                                    <p className="col-md-4">Project Description</p>
                                    <textarea name="projectDescription" rows="10" value={projectDescription} className="col-md-5" required 
                                              onChange={(e)=>set_projectDescription(e.target.value)}>
                                    </textarea>
                                </div>

                                <div className="d-flex mb-4">
                                    <p className="col-md-4">Start Date</p>
                                    <input type="date" name="startDate" value={startDate} className="col-md-5" required
                                            onChange={(e)=>set_startDate(e.target.value)}/>
                                </div>

                                <div className="d-flex mb-4" >
                                    <p className="col-md-4">End Date</p>
                                    <input type="date" name="endDate" className="col-md-5" value={endDate} required
                                           onChange={(e)=>set_endDate(e.target.value)}/>
                                </div>
                                
                               
                                <div>
                                    <p style={{color:"red"}}>{error}</p>
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <input type="submit" value="Create Project" />
                                    <a className="btn btn-danger " href="/myProjects">
                                        Cancel
                                    </a>
                                </div>
                            </form>
                        </div>
                    </td> 
    
                    <td style={{width:'15%'}}>
                    </td>
                </tr>
            </table>




         </div>
}