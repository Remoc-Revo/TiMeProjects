import React from "react";
import ProjectNav from "../navs/projectNav";
import MainNav from "../navs/mainNav";

export default function schedule(){
    return(
        <div>
            <MainNav/>
            <div className="pageContent">
            
                <div className="sideNav">
                    <ProjectNav/>
                </div>

                <div className="mainContent">

                </div>
                
                <div className="sideNav">
                    
                </div>
        
            </div>
        </div>
    )
}