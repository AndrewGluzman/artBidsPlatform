import React, { useEffect, useRef, useState } from 'react';
import { doApiGet, URL_API } from '../../services/apiSer';
import PageNav from '../misc/pagesNav';
import CartSide from './cartSide';
import Header from './header';
import ProdBox from './prodBox';

function CategoryPage(props) {
  let [cat, setCat] = useState({})
  let [prods_ar, setProdsAr] = useState([])
  let selectRef = useRef()


  useEffect(() => {
    doApi();
    // props.match -  חשוב מכיוון שנרצה שהפונקציה תפעל כל פעם שיו אר אל משתנה למעלה 
  }, [props.match])

  const doApi = async () => {
    // להוציא את המידע על הקטגוריה

    let url1 = URL_API + "/categories/single/" + props.match.params.id
    let dataCat = await doApiGet(url1)
    setCat(dataCat)

    // להוציא את כל המוצרים , נניח 8 בדף
    let currentPage = props.match.params.page || 0; 
    // sort -> לוקח מידע מהסלקט שלנו
    let url = URL_API + `/prods/?cat=${dataCat.s_id}&perPage=8&page=${currentPage}&sort=${selectRef.current.value}`;

    let prodsData = await doApiGet(url);
    setProdsAr(prodsData);
    // לעשות פג'ניישן 
  }

  const onSortchange = () => {
    doApi()
    // alert(selectRef.current.value);
  }


  return (
    <React.Fragment>
      <Header />
      <CartSide />
      <div className="container">
        <hr className="for_h2" />
        <h1 className="text-center h2_hr h2">
          <span>Product of {cat.name}</span>
        </h1>
        <h3 className="text-center">{cat.info}</h3>
        <div className="text-center row">
          <div className="col-lg-6 text-start">
          {cat.s_id &&
            <PageNav
              urlPageApi={"/prods/count?cat=" + cat.s_id}
              perPage="8"
              // לאן הלינקים של הכפתורים של העמודים יקחו אותנו
              pageLinkStart={"/cat/" + cat.s_id + "/"}

            />
          }
          </div>
          <div className="d-flex col-lg-6 justify-content-end">
            <label className="mt-1 me-2">Sort by:</label>
            <select onChange={onSortchange} ref={selectRef} className="form-select w-50">
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="date_created">Added to the shop</option>
            </select>
          </div>
        </div>
        {prods_ar.length == 0 && <div className="text-center"><img src="/images/loading.gif" /></div>}
        <div className="row mb-5">
          {prods_ar.map(item => {
            return (
              <ProdBox key={item._id} item={item} />
            )
          })}
        </div>

      </div>

    </React.Fragment>
  )
}

export default CategoryPage