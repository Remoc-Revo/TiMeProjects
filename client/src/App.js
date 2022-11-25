// import './App.css';
import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import Home from './pages';
import MyProjects from  './pages/myProjects';
import Dashboard from './pages/dashboard';
import SystemRequirements from "./pages/system_requirements";
import UserRequirements from "./pages/user_requirements";
import MyProgress from "./pages/myProgress";
import OverallProgress from "./pages/overallProgress";
import Schedule from "./pages/schedule";
import Members from "./pages/members";
import Login from "./pages/login";
import Register from './pages/register';
import CreateProject from "./pages/createProject";


import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
  
  return(
    <Router>
      
      <Routes>
        <Route  path='/'  element={<Home/>} />
        <Route path='/myProjects' element={<MyProjects/>}/>
        <Route path='/myProjects/dashboard' element={<Dashboard/>}/>
        <Route path='/myProjects/this/systemRequirements' element={<SystemRequirements/>}/>
        <Route path='/myProjects/this/userRequirements' element={<UserRequirements/>}/>
        <Route path='/myProjects/this/myProgress' element={<MyProgress/>}/>
        <Route path='/myProjects/this/overallProgress' element={<OverallProgress/>}/>
        <Route path='/myProjects/this/schedule' element={<Schedule/>}/>
        <Route  path='/myProjects/this/members' element={<Members/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createProject' element={<CreateProject/>}/>
      </Routes>
    </Router>
  )
}

// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state={apiResponse:""};
//   }

//   callAPI(){
//     fetch("http://localhost:9000/test")
//       .then((res)=>{res.text()})
//       .then((res)=>{this.setState({apiResponse:res})})
//       .catch(err=>err);
//   }

//   componentDidMount(){
//     this.callAPI();
//   }

//   render(){
//     return(
//       <div>
//         <header >
//           <h1>welcieeeeeeeee</h1>
//         </header>
//         <p>{this.state.apiResponse}</p>
//       </div>
//     )
//   }
// }

export default App;

