import React,{useState,useEffect} from "react";
import ProjectNav from "../navs/projectNav";
import {Button,Modal} from "react-bootstrap";
import '../index.css' ;
import MainNav from '../navs/mainNav';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Members(){
    const navigate=useNavigate();
    const [how,setShow]=useState(false);
    const [members,set_members]=useState([]);
    var [userLevel,set_userLevel]=useState();
    var [sessionId,set_sessionId]=useState();
    var [allEmails,set_allEmails]=useState();
    var [newMember,set_newMember]=useState();

    useEffect(()=>{
        axios.get('http://localhost:3001/members')
             .then((response)=>{
                set_members(response.data.members);
                set_sessionId(response.data.sessionId);
                set_userLevel(response.data.userLevel);
                
                var allEmailsBuffer=[]

                response.data.allEmails.map(email=>{
                   return allEmailsBuffer.push(<option value={email.userEmail}>{email.userEmail}</option>)
                })

                set_allEmails(allEmailsBuffer);
               
             })
             .catch((e)=>{
                if(e.response.status===401){
                    navigate('/login');
                }
             })
    },[navigate])

    // document.write(allEmails)

    function removeMember(userId){
        axios.post("http://localhost:3001/removeMember",
                   {userId:userId,
              })
              .then(()=>{
                
              })
              .catch((err)=>{
                if(err.response.status===401){
                    navigate('/login');
                }
              })
    }

    function addMember(){
        axios.post('http://localhost:3001/addMember',
              {newMember:newMember}
              )
             .catch((err)=>{
                if(err.response.status===401){
                    navigate('/login');
                }
             })
    }

    return(
        <div>
            <MainNav/>
            <div className="pageContent">
            
                <div className="sideNav">
                    <ProjectNav/>
                </div>

                <div className="mainContent">
                    <h5>Members</h5>
                    
                    <table class="table">
                            <thead class="bg-light">
                                <tr>
                                    
                                    <td>Name/email</td>
                                    <td>Phone</td>
                                    <td>Role</td>
                                    
                                    {userLevel===1 ? <td>Actions</td> : null}
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {members.map(member=>{
                                        return <tr>                                   
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img src={require("../user-alt.png")}
                                                         alt=""
                                                         style={{width:'40px',height:'40px'}}
                                                         class="rounded-circle"
                                                     />
                                                     
                                                     <div class="ms-3">
                                                        <p class="fw-bold mb-1">{member.userName}</p>
                                                        <p class="text-muted mb-0">{member.userEmail}</p>
                                                     </div>
                                                </div>
                                            </td>
        
                                           
                                            <td>
                                                {member.phone}
                                            </td>

                                            <td>
                                                {member.role}
                                            </td>

                                            <td>
                                                {(member.userId !== sessionId && userLevel===1) 
                                                    ?<button className="btn btn-link btn-sm btn-rounded" data-mdb-toggle="modal" 
                                                        data-mdb-target="#removeMember" 
                                                        onClick={()=>removeMember(member.userId)}>
                                                        REMOVE
                                                    </button>
                                                    : null
                                                }
                                            </td>
                                            
                                        </tr>
        
                                    })}
                               
                                
                            </tbody>
                        </table>
                                    
                    <div style={{paddingLeft:"800px"}}>
                        <Button className="btn btn-info btn-floating" onClick={()=>{setShow(true)}} title="Add Member">+</Button>

                        <Modal show={how} onHide={()=>setShow(false)}>
                            <Modal.Header closeButton>
                                <h5>Add Member</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={addMember} id="addMemberForm">
                                        <div class="md-form mb-5">
                                            <label  class="col-md-3">Search email </label>
                                            <select name="newMember" class="col-md-6" onChange={(e)=>set_newMember(e.target.value)}>
                                                <option>Select Email of new member</option>
                                                {allEmails}
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