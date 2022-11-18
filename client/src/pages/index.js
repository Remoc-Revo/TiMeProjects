import React from "react";
import MainNav from "../navs/mainNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Home=()=>{
    const navigate=useNavigate();
    const controller=new AbortController();

    async function getHomeData(){
        try{
            // document.write("response");
            await axios.get("http://localhost:3001/",                
                { withCredentials: true ,
                    
                }
                ).then((response)=>{
                    if(response.status===200){
                        
                    }
            
                })
        }
        catch(err){
            if(err.response.status===401){
                // document.write("the error ",err.response.status);
                navigate('/login');

            }
        }
        
    }

    getHomeData();
    // document.write("the performance nav ",PerformanceNavigationTiming);

   

    return(
        <div>
            <MainNav/>
            <table className="table table-bordered">
                <tr>
                    {/* <!--Sidebar--> */}

                    {/* style="width:15%" */}
                    <td >
                                                    
                    </td>

                    {/* <!--main content--> */}
                    <td >
                        <div className="container">
                            <ul className="list-group list-group-light">                               
                                <li className="list-group-item" >This notification</li>
                                <li className="list-group-item" >And this Project2 notification</li>
                            </ul>
                        </div>
                    </td> 
    
                    <td >
                    </td>
                </tr>
            </table>
        </div>
        
    )
    
    
}



export default Home;