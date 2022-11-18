import React from "react";
import {NavLink} from "react-router-dom";
import '../index.css';
import {Nav, Navbar,NavDropdown} from "react-bootstrap";

import ListGroup from 'react-bootstrap/ListGroup';

export default function projectNav(){
    return(
        // <ul class="nav project-nav list-group-light" style={{backgroundColor:'white'}}>
        //     <li>
        //         <NavLink className="nav-link" to="/myProjects/dashboard">Dashboard</NavLink>
        //     </li>
        //     <li>
        //         <NavLink className="nav-link" to="/myProjects/this/systemRequirements">Requirements</NavLink>
        //         <ul class="nav ms-3 flex-column">
        //             <li ><NavLink className="nav-link " to="/myProjects/this/systemRequirements" >System</NavLink></li>
        //             <li ><NavLink className="nav-link" to="/myProjects/this/userRequirements" >User</NavLink></li>
        //         </ul>
        //     </li>
        //     <li>
        //         <NavLink className="nav-link" to="/myProjects/this/myProgress">Progress</NavLink>
        //         <ul class="nav ms-3 flex-column">
        //             <li ><NavLink className="nav-link " to="/myProjects/this/myProgress" >mine</NavLink></li>
        //             <li ><NavLink className="nav-link" to="/myProjects/this/overallProgress" >overall</NavLink></li>
        //         </ul>
        //     </li>    
        //     <li>
        //         <NavLink className="nav-link " to="/myProjects/this/schedule">Schedule</NavLink>
        //     </li>            
        //     <li>
        //         <NavLink className="nav-link" to="/myProjects/this/members">Members</NavLink>
        //     </li>
            
                         
        // </ul>

        <Nav className="nav">
            <NavLink className="nav-link " to="/myProjects/dashboard">Dashboard</NavLink>

            <Nav.Link href="/myProjects/this/systemRequirements"><b>Requirements</b></Nav.Link>
            <div id="requirementsNavItems" className="ms-3 mb-3">
                <Nav.Link href="/myProjects/this/systemRequirements">system</Nav.Link>
                <Nav.Link className=""href="/myProjects/this/userRequirements">user</Nav.Link>
            </div>

            <Nav.Link href="/myProjects/this/myProgress"><b>Progress</b></Nav.Link>
            <div className="ms-3 mb-3">
                <Nav.Link href="/myProjects/this/myProgress">My progress</Nav.Link>
                <Nav.Link href="/myProjects/this/overallProgress">Overall</Nav.Link>
            </div>
            <Nav.Link href="/myProjects/this/schedule">Schedule</Nav.Link>
            <Nav.Link href="/myProjects/this/members">Members</Nav.Link>
        </Nav>
    );
}


// function ToggleNavItems(type){
//    if(type==="requirements"){
//         var div=document.getElementById("requirementsNavItems");
//         var displayValue=window.getComputedStyle(div).display;
        
//         if(displayValue==="none"){
//             div.style.display="block";
//         }
//         else{
//             div.style.display="none";
//         }
//    }
// }