import React from "react";
import ProjectNav from '../navs/projectNav';
import MainNav from '../navs/mainNav';

export default function myProgress(){
    return(
        <div>
            <MainNav/>
            <div className="pageContent">
                
                    {/*Sidebar*/}
                    <div className="sideNav">
                            
                       <ProjectNav/>
                    </div>

                    {/*main content*/}
                    <div className="mainContent">
                        <h5 >Project names Project</h5>
                        <br/>
                        <p style={{paddingLeft:"50%"}}>25%</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width:"25%;"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <br/>
                        <table className="table" >
                            <thead className="bg-light">
                                <tr>
                                    <td>Task</td>
                                    <td>Start date</td>
                                    <td>Deadline</td>
                                    <td>Status</td>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        network conecting all organisation's devices
                                    </td>
                                    
                                    <td>12-08-2022</td>
                                    <td>
                                        23-8-2022
                                    </td>
                                    <td>
                                        <button className="btn btn-link" data-mdb-toggle="modal" data-mdb-target="#status">
                                            <p style={{color:"coral"}}>PENDING</p>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <div className="modal fade" id="status" aria-hidden="true" role="dialog" style={{padding:"30px;"}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header text-center">
                                        <h4 className="modal-title w-100 font-weight-bold">Update Status</h4>
                                        <button className="close" data-mdb-dismiss="modal" aria-label="close">
                                            <span className="close">&times;</span>
                                        </button>
                                    </div>
                                    <form className="modal-body mx-3">

                                        <div className="md-form mb-5 d-flex">
                                            <label for="pending" className="col-md-3" >Pending</label>
                                            <input type="checkbox" id="pending" name="pending" value="1"/>
                                        </div>
 
                                        <div className="md-form mb-5 d-flex">
                                            <label for="done" className="col-md-3">Done</label>
                                            <input type="checkbox" id="done" name="done" value="1" />
                                        </div>

                                        <div className="modal-footer d-flex justify-content-center">
                                            <button className="btn btn-success">
                                                update
                                            </button>
                                        </div>
                                       
                                    </form>
                                    
                                </div>
                            </div>
                        </div>

                        
                        
                    </div> 
    
                    <div className="sideNav">
                    </div>
                
            
            </div>
        </div>
    );
}