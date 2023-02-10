import React,{useEffect,createContext, useReducer, useContext} from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Profile from "./components/screens/Profile";
import Signin from "./components/screens/SignIn";
import Signup from "./components/screens/Signup";
import Home from "./components/screens/Home";
import CreatePost from "./components/screens/CreatePost";
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import { initialState, reducer } from "./reducers/userReducers";
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPost from './components/screens/SubscribeUserPosts'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(typeof(user),user)
    
    if(user){
      dispatch({type:"USER", payload:user})
      // navigate('/')
    }
    else{
      navigate('/signin')
    }
  },[])
  return (
    <Routes> 
    <Route path="/" element={<Home/>} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route path="/create" element={<CreatePost />} />
    <Route path="/profile/:userid" element={<UserProfile />} />
    <Route path="/myfollowingpost" element={<SubscribedUserPost />} />
    </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
<Router> 
  <div>
   <NavBar />
   <Routing />
    </div>
 </Router>
 </UserContext.Provider>
  );
}

export default App;
