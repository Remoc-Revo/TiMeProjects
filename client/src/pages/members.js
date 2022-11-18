import React,{useState} from "react";
import ProjectNav from "../navs/projectNav";
import {Button,Modal} from "react-bootstrap";
import '../index.css' ;
import MainNav from '../navs/mainNav';

export default function Members(){
    const [how,setShow]=useState(false);
    return(
        <div>
            <MainNav/>
            <div className="pageContent">
            
                <div className="sideNav">
                    <ProjectNav/>
                </div>

                <div className="mainContent">
                    <h5>Members</h5>
                    

                    <div style={{paddingLeft:"800px"}}>
                        <Button className="btn btn-info btn-floating" onClick={()=>{setShow(true)}} title="Add Member">+</Button>

                        <Modal show={how} onHide={()=>setShow(false)}>
                            <Modal.Header closeButton>
                                <h5>Add Member</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <form class="modal-body mx-3" action="/addMember" method="POST" id="addMemberForm">
                                        <div class="md-form mb-5">
                                            <label  class="col-md-3">Search email </label>
                                            <select name="newMember" class="col-md-6">
                                                {/* <% if (typeof allEmails != 'undefined'){
                                                    for(index in allEmails){%>
                                                        <option value="<%=allEmails[index].userEmail%>">
                                                            <%=allEmails[index].userEmail%>
                                                        </option>
                                                    <%}
                                                }%> */}
                                            </select>
                                        </div>

                                        {/* <% if(typeof error!='undefined'){%>
                                            <p style="color:red"><%=error%></p>
                                        <%}%> */}

                                        <div class="modal-footer d-flex justify-content-center">
                                            <input type="submit" value="add" class="btn btn-success"/>
                                                
                                        </div>
                                    </form>
                            </Modal.Body>
                        </Modal>

                    </div>

                </div>
                
                <div className="sideNav">
                    
                </div>
        
            </div>
        </div>
    )
}