import React from "react";
import {NavLink} from "react-router-dom"
import axios from "axios";

const NavBar=()=>{
    // const [removeCookie]=useCookies();

    function logout(){
        // removeCookie('token');
        axios.post('http://localhost:3001/logout')
             .then((response)=>{
             })
             .catch((err)=>{
                
             })
    }

    return(
        <header style={{padding:"0px 30px"}}>
            <nav className="navbar d-flex">
                <div className="d-flex" style={{paddingLeft:"84%"}}>           
                    <img src={require("../user-alt.png")} alt="" style={{width:"50px"}} className="rounded-circle"/>
                    <p>Remoc Revo</p>
                    <form onSubmit={logout}>
                        <input className="btn btn-dark btn-rounded" type="submit" value="logout" style={{height:"33px",marginLeft:"10px"}}/>
                            
                    </form>
                </div>
                <div className="container">
                    <div className="navbar-header">
                        <h1>TiMe Projects</h1>
                    </div>
                    <div >
                        <ul className="nav nav-pills">
                            <li className="nav-item"><NavLink exact={true} className="nav-link" end to="/" >Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link"  to="/myProjects">My Projects</NavLink></li>

                        </ul>
                    </div>
                    
                </div>
                
            </nav>
        </header>
    )
}

export default NavBar;