import React,{useState,useEffect,useRef} from "react";
import ProjectNav from "../navs/projectNav";
import { useNavigate } from "react-router-dom";
import '../index.css';
import {Modal,Button} from 'react-bootstrap';
import MainNav from '../navs/mainNav';
import axios from "axios";
 

export default function SystemRequirements(){

    const navigate=useNavigate();

    var [projectName,setProjectName]=useState();
    var [requirementsMarkup,set_requirementMarkup]=useState([]);
    
    var [addRequirement_show,set_addRequirement_show]=useState(false);
    var [editRequirement_show,set_editRequirement_show]=useState(false);

    var [requirement_term_to_edit,set_requirement_term_to_edit]=useState();
    var [requirement_description_to_edit,set_requirement_description_to_edit]=useState();
    var [requirement_id_to_edit,set_requirement_id_to_edit]=useState();

    var [new_requirement_term,set_new_requirement_term]=useState();
    var [new_requirement_description,set_new_requirement_description]=useState();


    useEffect(()=>{
        axios.get('http://localhost:3001/system_requirements',{withCredentials:true})
         .then((response)=>{

            setProjectName(response.data.projectName);
            // document.write("theeee response name",projectName);

            const requirements=response.data.requirements;

            var requirementsMarkup_buffer=[];

            requirements.forEach(requirement=>{
                requirementsMarkup_buffer.push(
                    <li>
                        <dl>
                            <dt>{requirement.requirementTerm}</dt>
                            <dd>
                                {requirement.requirementDescription}
                            </dd>
                        </dl>
                        <button className="btn btn-rounded btn-link btn-sm " style={{}}
                            onClick={()=>{
                                           setRequirementDetails(requirement.requirementTerm,
                                            requirement.requirementDescription,requirement.requirementId);
                                           set_editRequirement_show(true);
                                        }
                                    }
                            >
                            EDIT
                        </button>
                        <hr style={{width:"90%"}}/>
                    </li>
                )
            })
            set_requirementMarkup(requirementsMarkup_buffer);

          })
          .catch((err)=>{
            if(err.response.status===401){
                navigate('/login');
            }
          })

          function setRequirementDetails(term,description,id){

            
            set_requirement_term_to_edit(term);
            set_requirement_description_to_edit(description)
            set_requirement_id_to_edit(id);
                        
            // document.write("the term::",term)

            }

        },[]);


        function addRequirement(){
            // document.write("the newaa d::",new_requirement_description,"<br> and t::",new_requirement_term);

            axios.post('http://localhost:3001/addRequirement',
                        {requirement_type:'system',
                         requirement_term:new_requirement_term,
                         requirement_description:new_requirement_description
                        })
                        .then((response)=>{
                            document.write(response.status);
                        })
                        .catch((e)=>{
                            document.write(e);
                        })
        }


        function editRequirement(){
            // document.write("the edits::",requirement_description_to_edit," <br>",requirement_term_to_edit,"<br>",requirement_id_to_edit);
            axios.post('http://localhost:3001/editRequirement',
                        {
                            requirement_term:'system',
                            requirement_id:requirement_id_to_edit,
                            requirement_term:requirement_term_to_edit,
                            requirement_description:requirement_description_to_edit
                        })
                        .catch((err)=>{
                            document.write(err);
                        })
        }
       
    return(
        <div>
            <MainNav/>
            <div className="pageContent">
                
                    {/* Sidebar */}
                    <div className="sideNav">
                        <ProjectNav/>
                    </div>

                    {/* main content */}
                    <div className="mainContent">
                        <h6>System Requirements</h6>
                            <h2>{projectName}</h2>

                        <div >
                            
                            <ol>
                                {requirementsMarkup}
                            </ol>
                        </div>
                        
                          {/* button for activating the requirement modal */}
                        <div>
                            <a href="#" className="btn btn-info btn-floating " title="Add requirement" style={{marginLeft:"94%"}} data-mdb-toggle="modal" data-mdb-target="#addRequirements">
                                <i className="fas fa-plus"></i>
                            </a>
                        </div>


                        {/* modal for adding requirements */}
                        

                        <div>
                            <Button className="btn btn-info btn-floating" onClick={()=>{set_addRequirement_show(true)}} title="Add requirement" style={{marginLeft:"94%"}}>+</Button>
                            <Modal show={addRequirement_show} onHide={()=>{set_addRequirement_show(false)}} className="container">
                                <Modal.Header closeButton>
                                    <Modal.Title><h4>Add Requirement</h4></Modal.Title>                                    
                                </Modal.Header>
                                <Modal.Body>
                                        <form className="form-custom-margin " onSubmit={addRequirement}  >
                                            <div className="md-form mb-5">
                                                <label for="requirement-term" className="col-md-3">Requirement term</label>
                                                <input type="text" name="requirement_term" id="requirement-term" className="col-md-6" onChange={(e)=>{set_new_requirement_term(e.target.value)}}/>
                                                
                                            </div>

                                            <div className="md-form mb-5 d-flex">
                                                <label for="requirement_description" className="col-md-3">Requirement description</label>
                                                <textarea name="requirement_description" id="requirement-description" rows="5" className="col-md-6" onChange={(e)=>{set_new_requirement_description(e.target.value)}}>
                                                </textarea>
                                            </div>

                                            <input type="hidden" name="requirement_type" value="system"/>

                                            <div className="modal-footer d-flex justify-content-center">
                                                <input type="submit" className="btn btn-success" value="Add"/>
                                                
                                            </div>
                                        </form>
                                        
                                    </Modal.Body>
                            </Modal>
                        </div>
                        

                         {/* modal for editing requirements */}
                        <Modal id="editRequirement" show={editRequirement_show} onHide={()=>{set_editRequirement_show(false)}} className="container" style={{padding:"30px;"}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title><h4 className="modal-title w-100 font-weight-bold">Edit requirement</h4></Modal.Title>
                                        
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form className="modal-body mx-3" id="requirementForm" onSubmit={editRequirement}>
                                            <div className="md-form mb-5">
                                                <label for="requirement-term" className="col-md-3">Requirement term</label>
                                                <input type="text" name="requirement_term" id="requirement_term_to_edit" className="col-md-6" value={requirement_term_to_edit}
                                                        onChange={(e)=>{set_requirement_term_to_edit(e.target.value)}}
                                                />
                                                
                                            </div>

                                            <div className="md-form mb-5 d-flex">
                                                <label for="requirement_description" className="col-md-3">Requirement description</label>
                                                <textarea name="requirement_description" id="requirement_description_to_edit" rows="10" className="col-md-6" value={requirement_description_to_edit}
                                                          onChange={(e)=>{set_requirement_description_to_edit(e.target.value)}}
                                                >
                                                </textarea>
                                            </div>

                                            <input type="hidden" name="requirement_type" value="system"/>

                                            <input type="hidden" id="requirement_id_to_edit" name="requirement_id" value={requirement_id_to_edit}/>

                                            <div className="modal-footer d-flex justify-content-center">
                                                <input type="submit" className="btn btn-success" value="Update change"/>
                                                    
                                            </div>
                                        </form>
                                    </Modal.Body>
                              
                        </Modal> 
                        
                        
                    </div> 
    
                    <div className="sideNav">
                    </div>
                
                </div>
            </div>

    )
}