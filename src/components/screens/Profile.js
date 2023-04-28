import React,{useEffect,useState,useContext} from "react";
import { UserContext } from "../../App";


const Profile = ()=>{
  const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const [image,setImage] = useState("")
  // const [url,setUrl] = useState("")
  useEffect(()=>{
    fetch('https://instaclone1-eu20.onrender.com/mypost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result)
      setPics(result.mypost)
    })
  },[])
  useEffect(()=>{
    if(image){
      const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","omi7986")
    fetch("https://api.cloudinary.com/v1_1/omi7986/image/upload",{
      method:"POST",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      // setUrl(data.url)
      // console.log(data)
      // dispatch({type:"UPDATEPIC",payload:data.url})
      fetch('https://instaclone1-eu20.onrender.com/updatepic',{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          pic:data.url
        })
      }).then(res=>res.json())
      .then(result=>{
        console.log(result)
        localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
        dispatch({type:"UPDATEPIC",payload:result.pic})
         window.location.reload()
      })
    
    })
    .catch(err=>{
      console.log(err)
    }) 
    }
  },[image])
  const updatePhoto = (file)=>{
    setImage(file)
    
  }
  return(
    <div style={{maxWidth:"800px", margin:"0px auto"}}>
        <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"1px solid grey"
        }}>
          <div>
            <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
            src={state?state.pic:"Loading"}
            />
            <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1" style={{
              'borderRadius':"90%"
            }}>
              <span style={{'fontSize':"20px"}} >+</span>
              <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
      </div>
          </div>

          <div>
            <h4>{state?state.name:"Loading"}</h4>
            <h4>{state?state.email:"Loading"}</h4>
            <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
              <h6>{mypics.length} posts</h6>
              <h6>{state?state.followers.length:"0"} Follower</h6>
              <h6>{state?state.following.length:"0"} Following</h6>
            </div>
          </div>
        </div>

        <div className="gallery">
          {
            mypics.map(item=>{
              return(
                <img key ={item._id} className="item" src={item.photo} alt={item.title}/>
              )
            })
          }
          
        </div>
    </div>
  )
}

export default Profile