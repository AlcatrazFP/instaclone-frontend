import React,{useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = ()=>{

    const navigate = useNavigate()
    const {state,dispatch}= useContext(UserContext)
    const renderList = ()=>{
        if(state){
         return [
            <li><Link key="1" to="/profile">Profile</Link></li>,
            <li><Link key="2" to="/create">Create Post</Link></li>,
            <li><Link key="3" to="/myfollowingpost">My Following Posts</Link></li>,
            <li>
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
            <li><Link to="/signin">Login</Link></li>,
            <li><Link to="/signup">Signup</Link></li>
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