import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { doApiMethod, URL_API } from '../../services/apiSer';

function AuthAdmin(props){
  let history = useHistory()

  useEffect(()=> {
    console.log("auth log")
    // check if there token
    //TODO: check if already in /admin
    if(!localStorage["tok"]){
      history.push("/admin");
    }
    else{
      doApi();
    }
  },[props.match])

  const doApi = async() => {
    let url = URL_API+"/users/checkAdmin";
    let data = await doApiMethod(url,"POST",{});
    // check if the token is valid and the user is admin
    if(data.auth != "success"){
      localStorage.removeItem("tok");
      history.push("/admin");
// 13:10
    }
  }

  return(
    <React.Fragment>
    </React.Fragment> 
  )
}

export default AuthAdmin