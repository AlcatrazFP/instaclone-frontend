import React,{useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = ()=>{

    const navigate = useNavigate()
    const {state,dispatch}= useContext(UserContext)
    const renderList = ()=>{
        if(state){
         return [
            <li key='1'><Link to="/profile">Profile</Link></li>,
            <li key='2'><Link to="/create">Create Post</Link></li>,
            <li key='3'><Link to="/myfollowingpost">My Following Posts</Link></li>,
            <li key='4'>
            <button className="btn #c62828 red darken-3"
            onClick={()=>{
                 localStorage.clear()
                 dispatch({type:"CLEAR"}) 
                 navigate('/signin')

            }}
            >
            LogOut
            </button>
            </li>
         ]
        }
        else{
         return [
            <li key='6'><Link to="/signin">Login</Link></li>,
            <li key='7'><Link to="/signup">Signup</Link></li>
         ]
        }
    }
    return(
    <nav>
        <div className="nav-wrapper white">
        <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
            {renderList()}
        </ul>
        </div>
  </nav>
    )
}

export default NavBar