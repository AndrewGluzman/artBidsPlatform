import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { doApiMethod, URL_API } from '../../services/apiSer';

function AuthClient(props){
  let history = useHistory()

  useEffect(()=> {
    console.log("auth log")
    // check if there token
    //TODO: check if already in /admin
    if(!localStorage["tok"]){
      history.push("/login");
    }
    else{
      doApi();
    }
  },[props.match]);

  const doApi = async() => {
    let url = URL_API+"/users/myInfo";
    let data = await doApiMethod(url,"GET");
    // check if the token is valid and the user is admin
    if(!data._id){
      localStorage.removeItem("tok");
      history.push("/login");
// 13:10
    }
  }

  return(
    <React.Fragment>
    </React.Fragment> 
  )
}

export default AuthClient