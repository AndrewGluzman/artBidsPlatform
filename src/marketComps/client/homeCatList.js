import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiSer';
import ProdBox from './prodBox';

function HomeCatList(props){
  let [cat,setCat] = useState({});
  let [prods_ar,setProdsAr] = useState([])

  useEffect(() => {
    doApi();
  },[])
  
  const doApi = async() => {
    // first get the category name by its id from props
    let url1 = URL_API+"/categories/single/"+props.catId;
    console.log(url1)
    let catInfo = await doApiGet(url1)
    setCat(catInfo)
    // second: get the list of prods of the same category
    let url = URL_API+"/prods/?cat="+props.catId+"&perPage=4";
    console.log(url)
    let prodsData = await doApiGet(url);
    console.log(prodsData)
    setProdsAr(prodsData);
  }

  return(
    <React.Fragment>
        <hr className="for_h2"/>
          <h2 className="h2_hr">
            <span>
            {cat.name}
            </span>
          </h2>
          {prods_ar.length == 0 && <div className="text-center"><img width="100" src="/images/loading.gif" /></div>}
          <div className="row mb-5">
            {prods_ar.map(item => {
              return(
                <ProdBox key={item._id} item={item} />
              )
            })}
            <div className="d-flex justify-content-center">
              <Link className="btn btn-dark mt-3" to={"/cat/"+cat.s_id}>More products of {cat.name}</Link>
            </div>
          </div>
    </React.Fragment> 
  )
}

export default HomeCatList