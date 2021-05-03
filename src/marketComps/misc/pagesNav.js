import React, { useEffect, useState } from 'react';
import { doApiGet, URL_API } from '../../services/apiSer'
import {Link} from "react-router-dom";

function PageNav(props){
  // address of the api request for get the amount of items total
  let urlPageApi = props.urlPageApi;
  // how much item we want to show per page to know how much pages btn to show
  let perPage = props.perPage
  // the pages btn link in the client url
  let pageLinkStart = props.pageLinkStart //"/admin/list/"
  // css class for style the btn of pages
  let btnClass = props.btnClass ? props.btnClass :  "btn btn-dark ms-1";

  let [pages,setPages] = useState(0)

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    console.log(urlPageApi)
    let data = await doApiGet(URL_API+ urlPageApi);
    console.log(data);
     setPages(Math.ceil(data.count/perPage))
  }

  return(
    <div>
      <span>Page:</span>
      {[...Array(pages)].map((item,i) => {
       return(
       <Link key={i} to={pageLinkStart+i} className={btnClass}>{i+1}</Link>
       )
      })}
    </div> 
  )
}

export default PageNav